// import { model } from "mongoose";

// function mass(req,res){
//     res.send('welcome to user curd hehhehe');
// }

// module.exports = {
//     mass
// //    create: (req,res) => {
// //         res.send('welcome to user curd hehhehe');
// //     }

// };



// import { UserSchema } from '../schemas';
// import database from '../../db';
// import { ResponseUtility } from '../../utility';
// import { S3Services } from '../../services/s3';
// import { S3_CATEGORY } from '../../constants';

// const UserModel = database.model('Users', UserSchema);
// /**
//  * this model function will help to create a category in database
//  */
// export default ({ email, password }) => new Promise(async (resolve, reject) => {
// 	if (email) {
// 		// check if title already exists
// 		const query = { $and: [{ email }] };
// 		UserModel.findOne(query)
// 			.then(async (result) => {
// 				if (result) {
// 					return reject(ResponseUtility.ERROR({ message: 'Duplicate email Id.' }));
// 				}
// 				// const Key = picture ? typeof picture === 'object' ? `category-${Date.now()}` : picture : undefined;
// 				// if (typeof picture === 'object') {
// 				// 	// trigger uploading on s3
// 				// 	const Bucket = S3_CATEGORY;
// 				// 	try {
// 				// 		await S3Services.uploadToBucket({ Bucket, Key, data: picture });
// 				// 	} catch (err) {
// 				// 		return reject(ResponseUtility.ERROR({ message: 'Error uploading to S3', error: err }));
// 				// 	}
// 				// }
// 				 const user = new UserModel({
// 					email,
// 					password
// 				});

// 				user.save()
// 					.then(() => resolve(ResponseUtility.SUCCESS))
// 					.catch(err => resolve(ResponseUtility.ERROR({ message: 'Error saving user', error: err })));
// 			}).catch(err => reject(ResponseUtility.ERROR({ message: 'Error looking for user', error: err })));
// 	} else {
// 		reject(ResponseUtility.MISSING_REQUIRED_PROPS);
// 	}
// });