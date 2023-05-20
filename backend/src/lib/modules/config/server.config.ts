import { readFileSync } from 'node:fs';
import { PrettyOptions } from 'pino-pretty';

const prettyOptions: PrettyOptions = {
  translateTime: 'HH:MM:ss Z',
  ignore: 'pid,hostname',
  colorize: true,
};

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: prettyOptions,
    },
  },
  production: true,
  test: false,
};

export const loadServerConfig = {
  logger: process.env.NODE_ENV
    ? envToLogger[process.env.NODE_ENV as keyof typeof envToLogger]
    : true,
  http2: true,
  https: {
    key:
      process.env.HTTPS_KEY ||
      readFileSync('/usr/src/app/certificats/localhost-key.pem'),
    cert:
      process.env.HTTPS_CERT ||
      readFileSync('/usr/src/app/certificats/localhost.pem'),
  },
};
