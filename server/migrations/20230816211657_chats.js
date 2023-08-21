exports.up = (knex) =>
  knex.schema.createTable('chats', (table) => {
    table
      .increments('id');
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .index();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('chats');
