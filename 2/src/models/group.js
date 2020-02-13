'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
    userId: DataTypes.BIGINT
  }, {});
  Group.associate = function(models) {
	// associations can be defined here
	Group.hasMany(models.User, { foreignKey: 'groupId', sourceKey: 'id' });
  };
  return Group;
};
