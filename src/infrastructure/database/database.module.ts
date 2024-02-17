import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './config/typeorm-config';
import UserSubscriber from './subscribers/user.subscriber';
import { HubspotModule } from 'src/providers/hubspot/hubspot.module';
import { HubspotService } from 'src/providers/hubspot/hubspot.service';
import CompanySubscriber from './subscribers/company.subscriber';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, HubspotModule],
      inject: [ConfigService],
      useFactory: TypeOrmConfig,
    }),
  ],
  providers: [ConfigService, UserSubscriber, CompanySubscriber, HubspotService],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
