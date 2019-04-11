import  { UserControllers,AuthenticateControllers } from './../controllers';

const prefix='/api/user/';
// module.exports =(app)=>{
//     // app.post(`${prefix}create`,UserControllers.create);
//     // app.get(`${prefix}show`,AuthenticateControllers.authenticate,UserController.show);
//     // app.post(`${prefix}login`,UserControllers.login);
//     // app.delete(`${prefix}token`,AuthenticateControllers.authenticate,UserControllers.del);
//     // // app.post(`${prefix}rit`,AuthenticateControllers.)
// };

// import { UserControllers } from './../controllers';
// const prefix = '/api/user/';


export default (app) =>{
    app.post(`${prefix}create`,UserControllers.create);
    app.get(`${prefix}show`,AuthenticateControllers.authenticate,UserControllers.show);
    app.post(`${prefix}login`,UserControllers.login);
    app.delete(`${prefix}token`,AuthenticateControllers.authenticate,UserControllers.del);
    // 
}