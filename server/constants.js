/**
* This is the twitter_handler constant file
* @author Ritosh Yadav
* @since Jan 1, 2019
*/

const host = process.env.MONGO_HOST || 'localhost';
const db = process.env.MONGO_DB || 'myapp';
const port = 27017;

export const mongoConnectionString = `mongodb://${host}:${port}/${db}`;

// this string is unique for each project construction
export const secretString = 'cfnPvshRzLYRKRyJGCA9fpCwOlVIRdUc';

export const STRIPE_SECRET='sk_test_JsCsxS0RraU3IKv5ivfjlcfG001s5QxVxU';



