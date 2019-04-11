import { PaymentControllers, AuthenticateControllers } from './../controllers';

const prefix = '/api/payment/';

export default (app) => {
    app.post(`${prefix}checkSaveCard`, AuthenticateControllers.authenticate, PaymentControllers.checkSaveCard);
    app.post(`${prefix}addCard`, AuthenticateControllers.authenticate, PaymentControllers.addCard);
    app.post(`${prefix}removeCard`, AuthenticateControllers.authenticate, PaymentControllers.removeCard);
    app.post(`${prefix}updateCard`, AuthenticateControllers.authenticate, PaymentControllers.updateCard);
    app.post(`${prefix}cardPay`, AuthenticateControllers.authenticate, PaymentControllers.cardPay);
    // app.post(`${prefix}searchByName`, AuthenticateControllers.authenticate, StudentControllers.searchByName);
    // app.get(`${prefix}list`, AuthenticateControllers.authenticate, StudentControllers.list);
};




// checkSaveCard,
// addCard,ss
// removeCard,
// updateCard,
// cardPay
// }

