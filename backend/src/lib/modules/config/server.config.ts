import { readFileSync } from 'node:fs';
import { PrettyOptions } from 'pino-pretty';

export enum NODE_ENVS {
  DEV = 'development',
  PROD = 'production',
  TEST = 'test',
}
export type NodeEnvs = `${NODE_ENVS}`;

const prettyOptions: PrettyOptions = {
  translateTime: 'HH:MM:ss Z',
  ignore: 'pid,hostname',
  colorize: true,
};

const envToLogger = {
  [NODE_ENVS.DEV]: {
    transport: {
      target: 'pino-pretty',
      options: prettyOptions,
    },
  },
  [NODE_ENVS.PROD]: true,
  [NODE_ENVS.TEST]: false,
};

export const loadServerConfig = {
  logger: process.env.NODE_ENV
    ? envToLogger[process.env.NODE_ENV as NodeEnvs]
    : true,
  http2: true,
  https: {
    key: readFileSync('/usr/src/app/certificats/localhost-key.pem'),
    cert: readFileSync('/usr/src/app/certificats/localhost.pem'),
  },
};
