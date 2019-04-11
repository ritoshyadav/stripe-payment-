import mongoose from 'mongoose';
// import validator from 'validator';

const AssignSchema = new mongoose.Schema({
    assignDate:{
        type:Date,
        trim:true,
        required:true
    },
    studentID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    },
    teacherID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    assignConfirm:{
        type:Boolean,
        default:false
    },
    assignConfimDate:{
        type:Date,
        trim:true,
        // required:true
    },
    paymetType:{
        feeType:{
            type:String,
            trim:true,
            default:'Monthly'
        },
        feeRupes:{
            type:Number,
            trim:true,
            default:'00'
        }
    },
    _creator:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }
    },{timestamps:true});


    var Assign= mongoose.model('Assign',AssignSchema);
    module.exports =Assign;