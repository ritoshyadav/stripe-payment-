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
  /**
 * This function comment is parsed by doctrine
 * @group User
 * @route POST /users/create
 * @param {User.model} user.body.required - the new point
 */

 /** 
 * @typedef User
 *@property {string} email.required
 *@property {string} password.required
 */
    app.post(`${prefix}create`,UserControllers.create);
    app.get(`${prefix}show`,AuthenticateControllers.authenticate,UserControllers.show);
    app.post(`${prefix}login`,UserControllers.login);
    app.delete(`${prefix}token`,AuthenticateControllers.authenticate,UserControllers.del);
    // 
}