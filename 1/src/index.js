const { Sequelize, DataTypes } = require('sequelize');
const db = require('./config/config').DB;

const sequelize = new Sequelize(
  `${db.dialect}://${db.username}:${db.password}@${db.host}:${db.port}/${db.database}`,
  {
	logging: db.logging,
	pool: db.pool,
  }
);

(async function() {
  try {
    await sequelize.authenticate();
      console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

//1-----------------------------
//   const sql = `
//   create table "roles" ("id" serial primary key, "name" varchar(1000) not null);
//   create table "users" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "roleId" bigint not null, "created_at" timestamptz,
//    "updated_at" timestamptz);
//   alter table "users" add constraint "users_roleid_foreign" foreign key ("roleId") references "roles" ("id");
//   `;
//   const result = await sequelize.query(sql);
//   console.log(result);
//1-----------------------------

//2-----------------------------
  const Role = sequelize.define('Role', {
	name: DataTypes.STRING(20),
  }, {
    timestamps: false
  });
  const User = sequelize.define('User', {
	firstName: DataTypes.STRING(20),
	lastName: DataTypes.STRING(20),
  }, {
    hooks: {
      beforeUpdate:
        (instance, options) => {
          // eslint-disable-next-line no-param-reassign
        //   instance.dataValues.changed = true;
        //   instance.changed('changed', true);
          options.fields.push('changed');
		  // eslint-enable-next-line no-param-reassign
	  }
	}
  });

  Role.hasMany(User);
  User.belongsTo(Role);

  await sequelize.sync();
//2-----------------------------

//3-----------------------------
//   const admin = Role.build({name: 'Admin'});
//   await admin.save();
//   await Role.create({name: 'User'});

//   await User.create({firstName: 'Admin', RoleId: admin.id});
//3-----------------------------

//4-----------------------------
const role = await Role.findOne({ where: { name: 'Admin' } });
  const admins = await role.getUsers();
  console.log(admins.map(el => el.firstName));
  //const admins = await User({ where: { RoleId: role.id } });
  //console.log(admins);

  const role1 = await Role.findOne({ where: { name: 'Admin' }, include: User });
  console.log(role1);
  console.log(role1.Users.map(el => el.firstName));
//4-----------------------------

  try {
    await sequelize.close();
      console.log('Connection has been closed successfully.');
  } catch (error) {
    console.error('Unable to close the database connection:', error);
  }
})();
