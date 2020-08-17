'use strict';
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		'User',
		{
			email: {
				type: DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			nickname: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			paranoid: true,
			freezeTableName: true,
			tableName: 'users',
		},
	);
	return User;
};
