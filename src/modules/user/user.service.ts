import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import CreateUserDto from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/infrastructure/database/entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserResponse } from './interfaces/create-user-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto): Promise<CreateUserResponse> {
    try {
      const tempUser = this.userRepository.create(user);
      const createdUser = await this.userRepository.save(tempUser);
      return createdUser;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('duplicate')
      ) {
        throw new ConflictException('Provided user email already exists');
      } else {
        throw new InternalServerErrorException(`Error creating user ${error}`);
      }
    }
  }
}
