import { TeacherControllers, AuthenticateControllers } from './../controllers';

const prefix = '/api/teacher/';

export default (app) => {
    app.post(`${prefix}create`, AuthenticateControllers.authenticate, TeacherControllers.create);
    app.get(`${prefix}details/:id`, AuthenticateControllers.authenticate, TeacherControllers.details);
    app.get(`${prefix}`, AuthenticateControllers.authenticate, TeacherControllers.list);
    app.put(`${prefix}update/:id`, AuthenticateControllers.authenticate, TeacherControllers.update);
    app.post(`${prefix}searchByFaculty`, AuthenticateControllers.authenticate, TeacherControllers.searchByFaculty);
    app.post(`${prefix}searchByName`, AuthenticateControllers.authenticate, TeacherControllers.searchByName); 
};