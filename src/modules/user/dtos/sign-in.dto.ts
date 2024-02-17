import { Length, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class SignInDto {
  @IsEmail()
  @Length(6, 100)
  @ApiProperty({
    description: 'User email',
    minLength: 6,
    maxLength: 100,
    required: true,
  })
  email: string;

  @MinLength(10)
  @ApiProperty({
    description: 'User password',
    minLength: 10,
    required: true,
  })
  password: string;
}
