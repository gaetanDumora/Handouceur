import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email', 60).notNullable().unique();
    table.string('name', 20);
    table.specificType('password', 'CHAR(512)').notNullable();
    table.specificType('salt', 'CHAR(512)');
    table.boolean('admin').defaultTo('false');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users');
}
