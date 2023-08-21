exports.up = (knex) =>
  knex.schema.createTable('files', (table) => {
    table
      .increments('id');
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
      .string('path')
      .notNullable();
    table
      .timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTable('files');
