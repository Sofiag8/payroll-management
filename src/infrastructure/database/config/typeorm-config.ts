import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const TypeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: configService.get<number>('POSTGRES_PORT'),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_NAME'),
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../**/*.migration{.ts,.js}`],
  synchronize: configService.get<boolean>('POSTGRES_SYNCHRONIZE'),
  logNotifications: configService.get<boolean>('POSTGRES_LOG_NOTIFICATIONS'),
});
