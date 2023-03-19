import { readFileSync } from 'node:fs';

// const transport = pino.transport({
//   target: 'pino-pretty',
//   options: { colorize: true },
// });

// const logger = pino({ level: env.LOG_LEVEL }, transport);
export const loadServerConfig = {
  logger: true,
  https: {
    key: readFileSync('/usr/src/app/certificats/localhost-key.pem'),
    cert: readFileSync('/usr/src/app/certificats/localhost.pem'),
  },
};
