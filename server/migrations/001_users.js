const bcrypt = require('bcrypt');

exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table
      .increments('id');
    table
      .string('email', 255)
      .unique()
      .notNullable();
    table
      .string('name', 255)
      .notNullable();
    table
      .string('password', 255)
      .notNullable();
    table
      .enum('role', ['admin', 'user'])
      .notNullable();
    table
      .timestamps(true, true);
  })
    .then(async () => {
      return knex('users').insert({
        email: 'adminEmail@mail.ru',
        password: await bcrypt.hash('checkUserToken', 5),
        role: 'admin',
        name: 'Администратор',
      });
    });

exports.down = (knex) => knex.schema.dropTable('users');
