import { AssignControllers, AuthenticateControllers } from './../controllers';

const prefix = '/api/assign/';

export default (app) => {
    app.post(`${prefix}create`, AuthenticateControllers.authenticate, AssignControllers.create);
    app.get(`${prefix}details/:id`, AuthenticateControllers.authenticate, AssignControllers.details);
    app.post(`${prefix}searchByTeacherWise`, AuthenticateControllers.authenticate, AssignControllers.searchByTeacherWise);
    app.post(`${prefix}searchByBoth`, AuthenticateControllers.authenticate, AssignControllers.searchByBoth);
    app.post(`${prefix}searchByStudentWise`, AuthenticateControllers.authenticate, AssignControllers.searchByStudentWise);
    // app.post(`${prefix}searchByName`, AuthenticateControllers.authenticate, StudentControllers.searchByName);
    app.get(`${prefix}list`, AuthenticateControllers.authenticate, AssignControllers.list);
};