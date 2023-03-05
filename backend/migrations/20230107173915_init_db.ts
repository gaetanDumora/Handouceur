import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.debug(true).createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 60).notNullable().unique();
    table.string('name', 20).notNullable();
    table.string('avatar_url');
    table.text('password').notNullable();
    table.text('salt');
    table.boolean('admin').defaultTo('false');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });

  await knex.schema.debug(true).createTable('journeys', (table) => {
    table.increments('id').primary();
    table.string('title', 20).notNullable();
    table.string('subtitle', 20).notNullable();
    table.string('location', 20).notNullable();
    table.specificType('coordinates', 'FLOAT[]');
    table.dateTime('start_date');
    table.dateTime('end_date');
    table.integer('price');
    table.enu('autonomy', ['GOOD', 'RELATIVE', 'IMPORTANT'], {
      enumName: 'autonomy_status',
      useNative: true,
    });
    table.string('image_url').notNullable();
    table.string('optional_url');
    table.text('main_description').notNullable();
    table.text('recreation_description').notNullable();
    table.text('hosting_description').notNullable();
    table.text('transport_description').notNullable();
    table.specificType('group_size', 'INT[]');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('journeys');
}
