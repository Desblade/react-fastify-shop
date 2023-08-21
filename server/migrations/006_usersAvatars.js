exports.up = (knex) =>
  knex.schema.createTable('usersAvatars', (table) => {
    table
      .increments('id');
    table
      .bigInteger('user_id')
      .unsigned()
      .notNullable()
      .index();
    table
      .string('path')
      .notNullable();
    table
      .string('filename')
      .notNullable()
      .unique();
    table
      .string('originalName')
      .notNullable();
    table
      .bigInteger('size')
      .notNullable();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('usersAvatars');
