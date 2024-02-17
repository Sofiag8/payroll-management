import { Module } from '@nestjs/common';
import { JwtAuthStrategy } from './jwt-auth.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [ConfigService, JwtAuthStrategy],
})
export class AuthenticationModule {}
