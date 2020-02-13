const { sequelize, Role, User, Group } = require('./models');

(async function() {
  try {
    await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

  const admin = Role.build({name: 'Admin'});
  await admin.save();
  await Role.create({name: 'User'});
  await User.create({name: 'Admin', roleId: admin.id});

const role = await Role.findOne({ where: { name: 'Admin' } });
const admins = await role.getUsers();
console.log(admins.map(el => el.name));
//const admins = await User({ where: { RoleId: role.id } });
//console.log(admins);

const role1 = await Role.findOne({ where: { name: 'Admin' }, include: User });
console.log(role1);
console.log(role1.Users.map(el => el.name));


  try {
    await sequelize.close();
      console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to close the database connection:', error);
  }
})();
