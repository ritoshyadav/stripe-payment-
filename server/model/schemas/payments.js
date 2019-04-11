/**
 * this schema defines the payment schema in the database
 * @author Ritosh Yadav
 * @since 11th April 2019
 */
import { Schema } from 'mongoose';

const Payment = new Schema({
	ref: String, // corresponds to the user id
	stripeId: String,
	defaultSource: String, // the default card type
	deleted: Boolean,
	stripeCustomer: {},
	cardDetails:[{}],
	userCardId:{ type: String, default: null },
});

export default Payment;
