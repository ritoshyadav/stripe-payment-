import { StudentControllers, AuthenticateControllers } from './../controllers';

const prefix = '/api/student/';

export default (app) => {
    app.post(`${prefix}create`, AuthenticateControllers.authenticate, StudentControllers.create);
    app.get(`${prefix}details/:id`, AuthenticateControllers.authenticate, StudentControllers.details);
    app.post(`${prefix}searchByFaculty`, AuthenticateControllers.authenticate, StudentControllers.searchByFaculty);
    app.post(`${prefix}searchByStd`, AuthenticateControllers.authenticate, StudentControllers.searchByStd);
    app.post(`${prefix}searchByMob`, AuthenticateControllers.authenticate, StudentControllers.searchByMob);
    app.post(`${prefix}searchByName`, AuthenticateControllers.authenticate, StudentControllers.searchByName);
    app.get(`${prefix}list`, AuthenticateControllers.authenticate, StudentControllers.list);
};