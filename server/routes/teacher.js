import { TeacherControllers, AuthenticateControllers } from './../controllers';

const prefix = '/api/teacher/';

export default (app) => {
  /**
 * This function comment is parsed by doctrine
 * @group Teacher
 * @route POST /Teacher/create
 * @param {Teacher.model} teacher.body.required - the new point
 * @property {string} x-auth.required
 */

 /** 
 * @typedef Teacher
 * @property {string} email.required
 * @property {string} password.required
 */
/**
 * @typedef headers
 * @property {string} x-auth.required
 */
   
    app.post(`${prefix}create`, AuthenticateControllers.authenticate, TeacherControllers.create);
     /**
 * This function comment is parsed by doctrine
 * @group Teacher
 * @route GET /api/teacher/details/{id}
 * @param {User.model}  x-auth.header
 * @param {Teacher.model} id.path
 */



    app.get(`${prefix}details/:id`, AuthenticateControllers.authenticate, TeacherControllers.details);
    app.get(`${prefix}`, AuthenticateControllers.authenticate, TeacherControllers.list);
    app.put(`${prefix}update/:id`, AuthenticateControllers.authenticate, TeacherControllers.update);
    app.post(`${prefix}searchByFaculty`, AuthenticateControllers.authenticate, TeacherControllers.searchByFaculty);
    app.post(`${prefix}searchByName`, AuthenticateControllers.authenticate, TeacherControllers.searchByName);
};