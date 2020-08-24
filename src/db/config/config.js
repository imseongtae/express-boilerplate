// const path = require('path');
// const storage = path.join(__dirname, '../../../db.sqlite');

module.exports = {
	development: {
		username: 'root',
		password: '12345',
		database: 'express',
		host: '127.0.0.1',
		dialect: 'mysql',
	},
	test: {
		username: 'root',
		password: '12345',
		database: 'express_test',
		host: '127.0.0.1',
		dialect: 'mysql',
		logging: false,
	},
	production: {
		username: 'root',
		password: null,
		database: 'database_production',
		host: '127.0.0.1',
		dialect: 'mysql',
		logging: false,
	},
};
