import { DataSourceOptions, DataSource } from 'typeorm';
import 'dotenv/config';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  entities: ['dist/infrastructure/database/entities/*.js'],
  migrations: ['dist/infrastructure/database/migrations/*{.ts,.js}'],
  synchronize: true,
  logNotifications: Boolean(process.env.POSTGRES_LOG_NOTIFICATIONS),
  migrationsRun: true,
  migrationsTableName: 'migrations',
};

export const AppDataSource = new DataSource(databaseConfig);
