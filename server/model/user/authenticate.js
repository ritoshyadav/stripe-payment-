// import { ADMIN, ADMIN_PASS } from '../../constants';
// import { UserSchema } from '../../models/schemas';
// import { ResponseUtility } from '../../utility';
// /**
//  * this will handle the authentication of the admin user.
//  * @author Ritosh Yadav
//  * @since 05 jan 2019
//  * @param {String} username
//  * @param {String} password
//  */
// export default ({ username, password }) => new Promise((resolve, reject) => {
// 	if (username && password) {
//         UserSchema.findOne({username}).then(user)
// 			if(!user){
// 				return reject();
// 			}

// 			return resolve(user);
			
			
// 	}
// 		// if (username === ADMIN && password === ADMIN_PASS) {
// 		// 	// return the admin object
// 		// 	return resolve({ role: 'admin' });
// 	// 	// }
// 	// 	reject(ResponseUtility.ERROR({ message: 'Username/Password invalid.' }));
// 	// } else {
// 	// 	reject(ResponseUtility.MISSING_REQUIRED_PROPS);
// 	// }
// // });
// 		});
