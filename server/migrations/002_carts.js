exports.up = (knex) =>
  knex.schema.createTable('carts', (table) => {
    table
      .increments('id');
    table
      .bigInteger('user_id')
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
  })
    .then(() => {
      return knex('carts').insert({
        user_id: 1,
      });
    });

exports.down = (knex) => knex.schema.dropTable('carts');
