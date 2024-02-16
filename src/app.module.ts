import { Module, ValidationPipe } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './infrastructure/database/database.module';
import { User } from './infrastructure/database/entities/user.entity';
import { HubspotModule } from './providers/hubspot/hubspot.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    UserModule,
    HubspotModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
