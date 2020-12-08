const db = require('../db/models');

module.exports = () => {
	const options = {
		force: process.env.NODE_ENV === 'test' ? true : false,
	};
	return db.sequelize.sync(options);
};
