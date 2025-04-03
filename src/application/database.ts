import { PrismaClient } from '@prisma/client';
import { logger } from './logging';

// Melakukan inisiasi prisma client, dengan menambahkan emit dengan jenis event sehinga log dari prisma bisa di kustomisasi
export const prismaClient = new PrismaClient({
  log: [
    { emit: 'event', level: 'query' },
    { emit: 'event', level: 'info' },
    { emit: 'event', level: 'warn' },
    { emit: 'event', level: 'error' },
  ],
});

// Membuat logging untuk setiap query, info, warn dan error
prismaClient.$on('query', (e: any) =>
  logger.info(`QUERY: ${e.query} - PARAMS: ${e.params}`)
);
prismaClient.$on('info', (e: any) => logger.info(`INFO: ${e.message}`));
prismaClient.$on('warn', (e: any) => logger.warn(`WARN: ${e.message}`));
prismaClient.$on('error', (e: any) => logger.error(`ERROR: ${e.message}`));
