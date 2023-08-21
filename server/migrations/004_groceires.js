exports.up = (knex) =>
  knex.schema.createTable('groceires', (table) => {
    table
      .increments('id');
    table
      .string('name', 255)
      .notNullable();
    table
      .string('description', 255)
      .notNullable();
    table
      .integer('price')
      .notNullable();
    table
      .bigInteger('file_id')
      .unsigned()
      .notNullable()
      .index();
    table
      .foreign('file_id')
      .references('id')
      .inTable('files')
      .onDelete('cascade');
    table
      .timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('groceires');
