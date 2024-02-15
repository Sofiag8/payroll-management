import { IsOptional, Length, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';

@Injectable()
export default class CreateUserDto {
  @Length(5, 50)
  @ApiProperty({
    description: 'User name',
    minLength: 5,
    maxLength: 50,
    required: true,
  })
  name: string;

  @Length(1, 50)
  @ApiProperty({
    description: 'User lastname',
    minLength: 1,
    maxLength: 100,
    required: true,
  })
  lastName: string;

  @IsEmail()
  @Length(6, 100)
  @Transform(({ value }) => String(value).toLowerCase())
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

  @MinLength(10)
  @IsOptional()
  @ApiProperty({
    description: 'User phone number',
    minLength: 10,
    required: false,
  })
  phoneNumber?: string;

  @MinLength(10)
  @IsOptional()
  @ApiProperty({
    description: 'User address',
    minLength: 10,
    required: false,
  })
  address?: string;
}
