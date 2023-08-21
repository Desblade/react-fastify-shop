exports.up = (knex) =>
  knex.schema.createTable('messages', (table) => {
    table
      .increments('id');
    table
      .integer('user_id')
      .notNullable()
      .unsigned()
      .index();
    table
      .integer('chat_id')
      .notNullable()
      .unsigned()
      .index();
    table
      .foreign('user_id')
      .references('id')
      .inTable('users')
      .onDelete('cascade');
    table
      .foreign('chat_id')
      .references('id')
      .inTable('chats')
      .onDelete('cascade');
    table
      .timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('messages');
