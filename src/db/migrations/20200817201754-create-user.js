'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			'Users',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				email: {
					type: Sequelize.STRING,
					unique: true,
					allowNull: false,
				},
				password: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				nickname: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
				},
			},
			{
				paranoid: true,
				freezeTableName: true,
				tableName: 'users',
				charset: 'utf8',
				collate: 'utf8_general_ci',
			},
		);
	},
	// eslint-disable-next-line no-unused-vars
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('Users');
	},
};
