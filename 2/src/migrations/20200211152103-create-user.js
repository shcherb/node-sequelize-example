'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      roleId: {
		type: Sequelize.BIGINT,
		onDelete: 'CASCADE',
		allowNull: false,
		references: {
			model: 'Roles',
			key: 'id',
			as: 'role'
		}
      },
      groupId: {
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
		type: Sequelize.DATE,
		defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};
