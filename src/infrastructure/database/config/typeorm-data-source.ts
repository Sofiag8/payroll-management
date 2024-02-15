import { DataSourceOptions, DataSource } from 'typeorm';
import 'dotenv/config';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/infrastructure/database/entities/*.js'],
  migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
  synchronize: true,
  logNotifications: Boolean(process.env.DATABASE_LOG_NOTIFICATIONS),
  migrationsRun: true,
  migrationsTableName: 'migrations',
};

export const AppDataSource = new DataSource(databaseConfig);
