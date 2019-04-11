import mongoose from 'mongoose';
import validator from 'validator';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

var UserSchema = new mongoose.Schema({
    email:{
        type: String,
        trim: true,
        required:true,
        minlength:1,
        unique:true,
        validate:{
            validator:validator.isEmail,
            message:`{value} is not a valid email`
        }
    },
    password:{
        type: String,
        trim: true,
        required:true,
        minlength:1
    },
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
},{timestamps:true});

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(),access}, 'hellofriend').toString();
 console.log('===---2--2-3--3-3',token)
    user.tokens.push({access, token});
    return user.save().then(() =>{
        return token;
    });
};

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    var fUser;

    try{
        decoded = jwt.verify(token, 'hellofriend');
        // console.log('====== hello in schema')
    }catch (e) {
        return Promise.reject();

    }
    return User.findOne({
        // fuser= User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access':'auth'
    }); 
    // consloe.log(token)
    // consloe.log(fUser)
}; 

UserSchema.statics.findByCredentials = function(email, password){
    var User = this;
// console.log("a--------adjhkajbckj")
    return User.findOne({email}).then((user)=>{
       if(!user){
           return Promise.reject();
       }
       return new Promise((resolve, reject) =>{
           bcrypt.compare(password, user.password,(err, res) =>{
               
               if(!res){
                   reject(); 
               }else{
                 // console.log("============",user)
                  resolve(user);
               }
           });
       });
   });
};

UserSchema.methods.removeToken = function (token){
    var user =this;
    return user.update({
        $pull:{
            tokens:{token}
        }
    });
};

UserSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) =>{
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password=hash;
                next();
            });
        });
    }else{
        next();
    }
});


var User =mongoose.model('User',UserSchema);
module.exports= User;
