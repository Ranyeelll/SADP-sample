import { Pool } from 'pg';

const connectionString = process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error('POSTGRES_URL is not configured.');
}

const isProduction = process.env.NODE_ENV === 'production';
const allowInsecureLocalSsl = process.env.POSTGRES_SSL === 'false' && !isProduction;

const globalForPg = globalThis;

export const pool =
  globalForPg.__sadpPool ??
  new Pool({
    connectionString,
    ...(allowInsecureLocalSsl ? {} : { ssl: { rejectUnauthorized: true } }),
  });

if (!globalForPg.__sadpPool) {
  globalForPg.__sadpPool = pool;
}

export async function ensureMessagesTable() {
  if (!globalForPg.__sadpSchemaReady) {
    globalForPg.__sadpSchemaReady = pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `).then(() => undefined);
  }

  return globalForPg.__sadpSchemaReady;
}