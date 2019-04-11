
/**
* This is the indexer for model
* @author Ritosh Yadav
* @since Tuesday, March 27, 2018 10:47 AM
*/
import fs from 'fs';

const skip = ['index.js'];
const files = fs.readdirSync(__dirname);

files.map((file) => {
	const found = skip.find(skipThisFile => skipThisFile === file);
	if (!found) {
		const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
		if (!fileName.startsWith('.')) {
			module.exports[`User${fileName}Service`] = require(`./${file}`).default;
		}
	}
});