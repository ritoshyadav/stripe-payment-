import UserModel from './../model/schemas/user';
import PaymentsModel from './../model/schemas/payments';
import TransactionsModel from './../model/schemas/transactions';
import { STRIPE_SECRET } from '../constants';
var { ObjectID } = require('mongodb');

// var stripe = require("stripe")("sk_test_JsCsxS0RraU3IKv5ivfjlcfG001s5QxVxU");

// stripe.customers.create({
//     description: 'Customer for jenny.rosen@example.com',
//     source: "tok_mastercard" // obtained with Stripe.js
// }, function (err, customer) {
//     // asynchronously called
// });

let returnObj = {
    success: false,
    message: "",
    data: null,
}
function checkSaveCard(req, res) {
    UserModel.findOneAsync({ email: req.body.email })
        .then((findUser) => {
            if (findUser) {
                let id = ObjectID(findUser._id);
                PaymentsModel.findOneAsync({ ref: id, deleted: false }).then(findPayment => {
                    returnObj.success = true;
                    returnObj.message = "Card alredy present";
                    returnObj.data = findPayment;
                    res.send(returnObj);
                }).catch(err => {
                    returnObj.success = false;
                    returnObj.message = "Card not present";
                    returnObj.data = null;
                    res.send(returnObj);
                }); TransactionsModel
            }
        }).catch(err => {
            returnObj.success = false;
            returnObj.message = "User not found";
            returnObj.data = null;
            res.send(returnObj);
        });
}


function addCard(req, res) {
    let id = '';
    const cardDetails = req.body;
    const stripe = STRIPE_SECRET;
    UserModel.findOneAsync({ email: req.body.email })
        .then((findUser) => {
            if (findUser) {
                id = ObjectID(findUser._id);
                PaymentsModel.findOneAsync({ ref: id, deleted: false }).then(findPayment => {
                    const user = findPayment;
                    if (user.userCardId) {
                        stripe.customers
                            .createSource(user.userCardId, {
                                source: {
                                    object: 'card',
                                    exp_month: cardDetails.expiryMonth,
                                    exp_year: cardDetails.expiryYear,
                                    number: cardDetails.cardNumber,
                                    cvc: cardDetails.cvc,
                                },
                            })
                            .then((newCard) => {
                                const newCardDetails = user.cardDetails;
                                let checkUser = false;
                                newCardDetails.forEach((obj) => {
                                    if (newCard.fingerprint === obj.fingerprint) {
                                        checkUser = true;
                                    }
                                });
                                if (checkUser) {
                                    res.send({ message: 'Card Already Present' });
                                } else if (cardDetails.saveCard) {
                                    newCardDetails.push(newCard);
                                    PaymentsModel.findOneAndUpdateAsync({ ref: id, deleted: false }, { $set: { cardDetails: newCardDetails } }, { new: true }) //eslint-disable-line
                                        .then((updateCard) => {
                                            returnObj.success = true;
                                            returnObj.message = "Successfully Added";
                                            returnObj.data = updateCard;
                                            res.send(returnObj);
                                        })
                                        .catch((err) => {
                                            returnObj.success = false;
                                            returnObj.message = "Error in adding new card details in database";
                                            returnObj.data = findPayment;
                                            res.send(returnObj);
                                        });
                                } else {
                                    returnObj.success = false;
                                    returnObj.message = "Card is not saved in database";
                                    returnObj.data = findPayment;
                                    res.send(returnObj);

                                }
                            })
                            .catch((err) => {
                                res.send({ data: err, message: 'Error in adding card to Stripe Account' });
                            });
                    } else {
                        stripe.customers
                            .create({ email: cardDetails.email })
                            .then((customer) => {
                                console.log('Custmer', customer); //eslint-disable-line
                                return stripe.customers.createSource(customer.id, {
                                    source: {
                                        object: 'card',
                                        exp_month: cardDetails.expiryMonth,
                                        exp_year: cardDetails.expiryYear,
                                        number: cardDetails.cardNumber,
                                        cvc: cardDetails.cvc,
                                    },
                                });
                            })
                            .then((source) => {
                                const newCardDetails = user.cardDetails;
                                newCardDetails.push(source);
                                PaymentsModel.findOneAndUpdateAsync({ ref: id, deleted: false }, { $set: { cardDetails: newCardDetails, userCardId: source.customer } }, { new: true }) //eslint-disable-line
                                    .then((updateUser) => {
                                        returnObj.success = true;
                                        returnObj.message = "Card successfully added and customer id created";
                                        returnObj.data = updateUser;

                                    })
                                    .catch((err) => {
                                        returnObj.success = false;
                                        returnObj.message = "Error in adding new card data for new user";
                                        returnObj.data = updateUser;
                                        res.send(returnObj);
                                    });
                            })
                            .catch((err) => {
                                res.send({ data: err, message: 'Error in adding new card in stripe' });
                            });
                    }
                })
                    .catch((err) => {
                        res.send({ data: err, message: 'Error in payment data' });
                    });
            }
        }).catch((err) => {
            res.send({ data: err, message: 'Error in finding user' });
        });
}

function removeCard(req, res) {
    let id = '';
    UserModel.findOneAsync({ email: req.body.email })
        .then((findUser) => {
            if (findUser) {
                id = ObjectID(findUser._id);
                PaymentsModel.findOneAsync({ ref: id, deleted: false }).then(findPayment => {
                    const { cardDetails } = findPayment;
                    let indexOfCard = -1;
                    if (cardDetails.length !== 0) {
                        // eslint-disable-next-line
                        cardDetails.map((obj, index) => {
                            //eslint-disable-line
                            if (obj.fingerprint === req.body.fingerprint) {
                                indexOfCard = index;
                            }
                        });
                    }
                    if (indexOfCard === -1) {
                        res.send({ message: 'Card Not Found' });
                    } else {
                        cardDetails.splice(indexOfCard, 1);
                        PaymentsModel.findOneAndUpdateAsync({ ref: id, deleted: false }, { $set: { cardDetails } }, { new: true }) //eslint-disable-line
                            .then((updateUser) => {
                                const newCardDetails = updateUser.cardDetails;
                                res.send({ data: newCardDetails, message: 'Card Successfully Removed' });
                            })
                            .catch((err) => {
                                res.send({ data: err, message: 'Unable to delete card' });
                            });
                    }
                })
                    .catch((err) => {
                        res.send({ data: err, message: 'Error in payment data' });
                    });
            }
        }).catch((err) => {
            res.send({ data: err, message: 'Error in finding user' });
        });
}

function updateCard(req, res) {
    const cardDetails = req.body;

    const stripe = STRIPE_SECRET;
    let id = '';
    UserModel.findOneAsync({ email: req.body.email })
        .then((findUser) => {
            if (findUser) {
                id = ObjectID(findUser._id);
                PaymentsModel.findOneAsync({ ref: id, deleted: false }).then(findPayment => {
                    const user = findPayment;
                    let cardId = null;
                    if (cardDetails.fingerprint) {
                        user.cardDetails.forEach((obj) => {
                            if (cardDetails.fingerprint === obj.fingerprint) {
                                cardId = obj.id;
                            }
                        });
                        if (cardId) {
                            stripe.customers
                                .update(user.userCardId, {
                                    default_source: cardId,
                                })
                                .then((checkCard) => {
                                    console.log('Default Card Changed', checkCard); //eslint-disable-line
                                })
                                .catch((err) => {
                                    res.send({ data: err, message: 'Error in changing default card' });
                                });
                        } else {
                            res.send({ message: 'No card found ' });
                        }
                        // res.send({ message: 'Updated Successfully' });
                    } else {
                        res.send({ message: 'Fingerprint data not available' });
                    }
                })
                    .catch((err) => {
                        res.send({ data: err, message: 'Error in updating card details' });
                    });
            }
        })
        .catch((err) => {
            res.send({ data: err, message: 'Error in updating card details' });
        });
}
function cardPay(req, res, next) {
    let paymentObj = {
        email: req.body.email,
        subscriptionAmount: req.body.amount,
        currency: req.body.currency,
    }
    cardPaymentProcess(paymentObj).then((paydetail)=>{
        returnObj.success = true;
        returnObj.message = "payment scuessfully done";
        returnObj.data = paydetail;
        res.send(returnObj);
    }).catch((err)=>{
        returnObj.success = false;
        returnObj.message = "payment fail";
        returnObj.data = null;
        res.send(returnObj);
    })

}
function cardPaymentProcess(subscriptionObj) {
    return new Promise((resolve, reject) => {
        const stripe = STRIPE_SECRET;
        stripe.setTimeout(20000);
        let id = '';
        UserModel.findOneAsync({ email: req.body.email })
            .then((findUser) => {
                if (findUser) {
                    id = ObjectID(findUser._id);
                    PaymentsModel.findOneAsync({ ref: id, deleted: false }).then(findPayment => {
                        const user = findPayment;
                        stripe.charges
                            .create({
                                amount: tripObj.tripAmt,
                                currency: 'usd',
                                customer: user.userCardId,
                            })
                            .then((charge) => {
                                const { id, status } = charge;
                                // add transaction here

                                const transactionDetails = new TransactionsModel({
                                    bookingId,
                                    stripeChargeId: id,
                                    amount,
                                    status,
                                    from,
                                    to,
                                    payoutDue,
                                    timestamp: Date.now(),	// the date when transaction was initiated
                                    payoutDone: false,	// will be done after the class is completed
                                    stripeChargeResponse: charge,
                                });
                                transactionDetails.save()
                                    .then((doc) => resolve(doc))
                                    .catch(err => reject(charge));
                            })
                            // resolve(paymentStatus);
                            .catch((err) => {
                                const paymentStatus = 'error';
                                console.log(err); //eslint-disable-line
                                // transaction here failed

                                const transactionDetails = new TransactionsModel({
                                    bookingId,
                                    stripeChargeId: id,
                                    amount,
                                    status,
                                    from,
                                    to,
                                    payoutDue,
                                    timestamp: Date.now(),	// the date when transaction was initiated
                                    payoutDone: false,	// will be done after the class is completed
                                    stripeChargeResponse: charge,
                                });
                                transactionDetails.save()
                                    .then((doc) => resolve(doc))
                                    .catch(err => reject(charge));
                                // resolve(paymentStatus);
                            });
                    })
                }
            })
            .catch((err) => {
                const paymentStatus = 'error';
                console.log(err); //eslint-disable-line
                reject(paymentStatus);
            });
    })
    // }).catch((e) => {
    //     console.log('test', e); //eslint-disable-line
    // });
    // })
}

// function saveTransaction(tripObj) {
//     const transactionOwner = new Transaction({
//         userIdFrom: tripObj.riderId,
//         tripId: tripObj._id, //eslint-disable-line
//         amount: Number(tripObj.tripAmt),
//         userIdTo: tripObj.driverId,
//     });
//     transactionOwner.saveAsync().then((transactionRider) => {
//         const returnObj = {
//             success: true,
//             message: '',
//             data: {},
//         };
//         returnObj.data.user = transactionRider;
//         returnObj.message = 'Transaction created successfully';
//     });
// }
export default {
    checkSaveCard,
    addCard,
    removeCard,
    updateCard,
    cardPay
}

