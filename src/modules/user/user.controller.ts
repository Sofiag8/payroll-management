import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dtos/create-user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserResponse } from './interfaces/create-user-response.interface';
import SignInDto from './dtos/sign-in.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, sone of the fields did not pass the validation',
  })
  @ApiResponse({
    status: 409,
    description: 'Passed email already exist',
  })
  signup(@Body() userData: CreateUserDto): Promise<CreateUserResponse> {
    return this.userService.createUser(userData);
  }

  @Post('/signin')
  @ApiResponse({
    status: 200,
    description: 'The account has been authenticated.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request, some of the fields did not pass the validation',
  })
  @ApiResponse({
    status: 404,
    description: 'Account not found',
  })
  async signIn(@Body() userLogin: SignInDto) {
    const jwt = this.userService.signIn(userLogin);
    return jwt;
  }
}
