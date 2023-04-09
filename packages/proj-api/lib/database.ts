import { Pool } from "pg";

let cachedPool: Pool;
 
/**
 * Creates new or returns cached database pool
 * @param username db user
 * @param password db user password
 * @returns database pool
 */
export const setupPool = (user: string, password: string): Pool => {

  // use cached pool if possible
  if (cachedPool) {
    console.log(`setupPool: reusing reader db instance for readonly operations`);
    return cachedPool;
  }

  // create new pool

  if (process.env.postgresHost == null) {
    throw new Error(`postgresHost environment variable is not defined.`);
  }

  const host = process.env.postgresHost;

  if (process.env.postgresPort == null) {
    throw new Error(`postgresPort environment variable is not defined.`);
  }
  const port = parseInt(process.env.postgresPort);
  if (isNaN(port)) {
    throw new Error(`postgresPort environment variable is not valid.`);
  }

  if (process.env.postgresDatabase == null) {
    throw new Error(`postgresDatabase environment variable is not defined.`);
  }
  const database = process.env.postgresDatabase;

  console.log(`create pool(user: ${user}`);

  const pool = new Pool({
    host,
    port,
    database,
    user,
    password,
    connectionTimeoutMillis: 28000,
  });

  cachedPool = pool;

  return pool;
};

/**
 * Creates new or returns cached database pool
 * @returns Pool
 */
export const setupApiPool = (): Pool => {
  if (process.env.postgresUser == null) {
    throw new Error(`postgresApiUser environment variable is not defined.`);
  }
  const user = process.env.postgresUser;

  if (process.env.postgresPassword == null) {
    throw new Error(`postgresApiPassword environment variable is not defined.`);
  }
  const password = process.env.postgresPassword;

  return setupPool(user, password);
};
