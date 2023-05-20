import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.debug(true).createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('address');
    table.string('avatar');
    table.text('password').notNullable();
    table.text('salt').notNullable();
    table.boolean('admin').notNullable().defaultTo('false');
    table.specificType('bookings', 'TEXT[]');
    table.timestamp('updated_at').notNullable();
    table.timestamp('created_at').notNullable();
  });

  await knex.schema.debug(true).createTable('journeys', (table) => {
    table.increments('id').primary();
    table.string('title');
    table.string('subtitle');
    table.string('location');
    table.specificType('coordinates', 'FLOAT[]');
    table.dateTime('start_date');
    table.dateTime('end_date');
    table.integer('price');
    table.enu('autonomy', ['GOOD', 'RELATIVE', 'IMPORTANT'], {
      enumName: 'enum_autonomy_status',
      useNative: true,
    });
    table.specificType('images', 'TEXT[]').notNullable();
    table.text('main_text');
    table.text('recreation_text');
    table.text('hosting_text');
    table.text('transport_text');
    table.integer('group_size');
    table.integer('companions');
    table.specificType('candidates', 'TEXT[]');
    table.timestamp('updated_at').notNullable();
    table.timestamp('created_at').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('journeys');
  await knex.schema.raw('DROP TYPE enum_autonomy_status');
}
