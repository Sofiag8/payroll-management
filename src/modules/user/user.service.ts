import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import SignInDto from './dtos/sign-in.dto';
import CreateUserDto from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { validatePassword } from '../../utils/validate-password';
import { User } from 'src/infrastructure/database/entities/user.entity';
import { CreateUserResponse } from './interfaces/create-user-response.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
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

  async signIn(userData: SignInDto) {
    const { email, password } = userData;
    const [user] = await this.getUserDataByEmail(email);
    const arePasswordsEqual = await validatePassword(password, user?.password);
    if (!arePasswordsEqual) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, id: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUserDataByEmail(email: string) {
    try {
      const user = await this.userRepository.find({
        where: { email },
      });

      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('not found')
      ) {
        throw new NotFoundException('User not found');
      } else {
        throw new InternalServerErrorException(
          `Error getting user: ${(<Error>error).message}`,
        );
      }
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      if (!user) throw new NotFoundException('User not found');
      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('not found')
      ) {
        throw new NotFoundException('User not found');
      } else {
        throw new InternalServerErrorException(
          `Error getting user by id: ${(<Error>error).message}`,
        );
      }
    }
  }
}
