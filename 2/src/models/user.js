'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.BIGINT,
    groupId: DataTypes.BIGINT
  }, {});
  User.associate = function(models) {
	// associations can be defined here
	User.belongsTo(models.Role, { foreignKey: 'roleId', targetKey: 'id'});
	User.belongsTo(models.Group, { foreignKey: 'groupId', targetKey: 'id'});
  };
  return User;
};
