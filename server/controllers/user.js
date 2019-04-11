

import UserModel from './../model/schemas/user';
import bodyParser from 'body-parser';
import Authenticate from './authenticate';
import _ from 'lodash';

// module.exports ={
//     create(req,res,next){
//         const userCreate= req.body;
//         // UserModel.save().then((result) =>{
//         //     res.status(200).send(result);
//         // }).catch((err) =>{
//         //     res.status(400).send(err);
//         // })
//         UserModel.create(userCreate)
//         .then(UserModel => res.send(UserModel))
//         .catch(next);
//     },
// }
function create(req, res){
    console.log('welcome to controllers')
   var body=_.pick(req.body,['email','password']);
    var userCreate = new UserModel(body);
userCreate.save().then(()=>{
    console.log('near by token')
    return userCreate.generateAuthToken();
    //    res.send(user);
    }).then((token) => {
        res.header('x-auth',token).send(userCreate);
    }).catch((e)=>{
        res.status(400).send(e);
    })
};



//     userCreate.save().then((result)=>{
//     //     res.send({
//     //         statusCode:200,
//     //         data:result
//     // });
//     res.status(200).send(result);
// })
// .catch((err) =>{
// //     res.send({
// //         statusCode:400,
// //         data:err
// //     })
// res.status(400).send(err);
// })





function show(req, res){
    res.send(req.user)
};



function login(req,res){
    var body=_.pick(req.body,['email','password']);
    UserModel.findByCredentials(body.email, body.password).then((user) => {
     return user.generateAuthToken().then((token) =>{
        res.header('x-auth',token).send(user);
     })
        //res.send(user);
    }).catch((e) => {
        res.status(400).send();
    });
};

function del(req, res) {
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },() =>{
        res.status(400).send();
    });
};

export default {
    create,
    show,
    del,
    login
}