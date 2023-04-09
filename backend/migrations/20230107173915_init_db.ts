import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.debug(true).createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 60).notNullable().unique();
    table.string('first_name', 60).notNullable();
    table.string('last_name', 60).notNullable();
    table.string('address', 60);
    table.string('avatar');
    table.text('password').notNullable();
    table.text('salt');
    table.boolean('admin').defaultTo('false');
    table.timestamp('created_at').notNullable();
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
    table.specificType('images', 'TEXT[]').notNullable();
    table.string('optional_image');
    table.text('main_text').notNullable();
    table.text('recreation_text').notNullable();
    table.text('hosting_text').notNullable();
    table.text('transport_text').notNullable();
    table.specificType('group_size', 'INT[]');
    table.timestamp('updated_at').notNullable();
    table.timestamp('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('journeys');
}
