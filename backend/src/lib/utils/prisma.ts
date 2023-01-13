import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['error', 'info', 'query', 'warn'],
  datasources: { db: { url: process.env.DATABASE_URL } },
});

export default prisma;
