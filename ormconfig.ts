import { DataSource } from 'typeorm';

async function getConfig() {
  const password = process.env.DB_CREDENTIAL || 'rooter123@';
  return new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number.parseInt(process.env.DB_PORT) || 3308,
    username: process.env.DB_USERNAME || 'rooter',
    password,
    database: process.env.DB_DATABASE || 'rooter',
    logging: false,
    synchronize: false,
    entities: ['src/**/**.entity{.ts,.js}'],
    migrations: ['migrations/**/*{.ts,.js}'],
  });
}

/* eslint-disable */
const configPromise = getConfig();
export default configPromise;
