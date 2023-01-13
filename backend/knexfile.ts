import type { Knex } from 'knex';

// Update with your config settings.
//ts-ignore

const config: { [key: string]: unknown } = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    extension: 'ts',
  },
};

module.exports = config;
