/**
 * schema for transactions. They contains the money transfers listing
 * data
 * @author Ritosh Yadav
 * @since 11th April 2011
 */
import { Schema } from 'mongoose';

const Transaction = new Schema({
	bookingId: String,
	to: String, // teacherid to whom the payout is to be made
	from: String, // the id of the student who made the payment
	payoutDue: Number, // timestamp of the payout due date.. It should be 2 days after the class date
	stripeChargeId: String,
	/**
	 * @todo handle all payout error handling like
	 * declined bank access so that the user could be notified
	 * property and credits remain secure.
	 * Set this to true after the payout is complete.
	 */
	payoutDone: Boolean,
	payoutTimestamp: Number, // the day when payout was done
	payoutResponse: {},	// the response representing error/success transfer response
	amount: Number,
	status: String,
	type: Number,
	timestamp: Number,
	stripeChargeResponse: {},
	refunded: false,
	refundTimestamp: Number,
	refundResponse: {},
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
});
// Transaction.virtual('bookings', {
// 	ref: 'Bookings',
// 	localField: 'bookingId',
// 	foreignField: '_id',
// 	justOne: true,
// });

export default Transaction;
