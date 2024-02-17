import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import Company from 'src/infrastructure/database/entities/company.entity';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/infrastructure/database/entities/user.entity';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TypeOrmModule.forFeature([Company, User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [CompanyController],
  providers: [CompanyService, UserService, JwtService],
})
export class CompanyModule {}
