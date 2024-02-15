import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/database/entities/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
