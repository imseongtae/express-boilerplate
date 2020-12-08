// const path = require('path');
// const storage = path.join(__dirname, '../../../db.sqlite');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
	development: {
		username: 'root',
		password: '12345',
		database: 'backend',
		host: '127.0.0.1',
		dialect: 'mysql',
		timezone: '+09:00',
		dialectOptions: {
			charset: 'utf8mb4',
			dateStrings: true,
			typeCast: true,
		},
		logging: false,
	},
	test: {
		dialect: 'sqlite',
		storage: ':memory',
		logging: false,
	},
	production: {
		username: process.env.DB_ADMIN,
		password: process.env.DB_PASSWORD,
		database: 'backend',
		host: process.env.DB_HOST,
		dialect: 'mysql',
		timezone: '+09:00',
		dialectOptions: {
			charset: 'utf8mb4',
			dateStrings: true,
			typeCast: true,
		},
		logging: false,
	},
};
