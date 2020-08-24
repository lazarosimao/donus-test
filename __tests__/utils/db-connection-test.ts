import { Connection, createConnection } from 'typeorm'

let connection: Connection | null = null

// export async function getConnection() {
//   const DATABASE_TYPE = 'sqlite';
//   const DATABASE_ENTITIES = ['src/entities/**/*.ts'];
//   const MIGRATIONS = ["src/database/migration/**/*.ts"];
//   const CLI = {
//     "entitiesDir": "src/entities",
//     "migrationsDir": "src/database/migration",
//     "subscribersDir": "src/database/subscriber"
//   };

//   connection = await createConnection({
//     name: 'test',
//     type: DATABASE_TYPE,
//     database: "./__tests__/database/storage/db-donus-tests.sqlite3",
//     entities: DATABASE_ENTITIES,
//     migrations: MIGRATIONS,
//     cli: CLI
//   });
//   return connection;
// }

// export async function closeConnection() {
//   await connection?.close();
// }