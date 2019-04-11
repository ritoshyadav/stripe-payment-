// const User = require('../models/user');
// import { SchemaServices } from './../model';
 import User from './../model/schemas/user';
 
var authenticate = (req, res, next) =>{
    var token = req.header('x-auth');

    // console.log('============',token);
User.findByToken(token).then((user) => {
    if(!user){
        return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
}).catch((e) =>{
    res.status(401).send();
});
};


export default {
    authenticate
}
