'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Users', ['groupId'], {
      type: 'foreign key',
		name: 'Users_Groups_groupid_fkey',
		references: { // Required field
		  table: 'Groups',
		  field: 'id'
		}
	  })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Users', 'Users_Groups_groupid_fkey')
  }
};
