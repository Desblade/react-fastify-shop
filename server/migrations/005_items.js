exports.up = (knex) =>
  knex.schema.createTable('items', (table) => {
    table
      .increments('id');
    table
      .integer('count')
      .notNullable();
    table
      .bigInteger('groceires_id')
      .unsigned()
      .index();
    table
      .bigInteger('cart_id')
      .notNullable()
      .unsigned()
      .index();
    table
      .foreign('cart_id')
      .references('id')
      .inTable('carts')
      .onDelete('cascade');
    table
      .foreign('groceires_id')
      .references('id')
      .inTable('groceires')
      .onDelete('cascade');
    table
      .timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('items');
