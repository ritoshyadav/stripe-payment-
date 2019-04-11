/**
* This is the indexer for services
* @author gaurav sharma
* @since Jan 13, 2019
*/
import fs from 'fs';

const skip = ['index.js', 'template'];
const files = fs.readdirSync(__dirname);

files.map((file) => {
	const found = skip.find(skipThisFile => skipThisFile === file);
	if (!found) {
		const fileName = `${file.charAt(0).toUpperCase()}${file.split('.')[0].substring(1, file.length)}`;
		if (!fileName.startsWith('.'))
			module.exports[`${fileName}Services`] = require(`./${file}`).default;
	}
});