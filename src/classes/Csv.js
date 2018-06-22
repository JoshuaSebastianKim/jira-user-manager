const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const csvParse = require('csv-parse');

const readFile = promisify(fs.readFile);
const parse = promisify(csvParse);

class Csv {
	constructor(filepath) {
		if (!filepath)
			throw new TypeError('filepath is not defined');

		this.filepath = path.resolve(process.cwd(), filepath);
	}

	async toJson() {
		const file = await readFile(this.filepath, 'utf8');
		const csvJson = await parse(file, { columns: true });

		return csvJson;
	}
}

module.exports = Csv;