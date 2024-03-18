import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './infrastructure/database/database.module';
import { User } from './infrastructure/database/entities/user.entity';
import { HubspotModule } from './providers/hubspot/hubspot.module';
import { CompanyModule } from './modules/company/company.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { PassportModule } from '@nestjs/passport';
import { KeycloakModule } from './providers/keycloak/keycloak.module';

@Module({
  imports: [
    UserModule,
    CompanyModule,
    HubspotModule,
    DatabaseModule,
    KeycloakModule,
    AuthenticationModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
