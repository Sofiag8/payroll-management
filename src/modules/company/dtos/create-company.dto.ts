import { IsOptional, Length, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Injectable } from '@nestjs/common';
import { Transform } from 'class-transformer';

@Injectable()
export default class CreateCompanyDto {
  @Length(5, 150)
  @ApiProperty({
    description: 'User name',
    minLength: 5,
    maxLength: 150,
    required: true,
  })
  name: string;

  @Length(1, 150)
  @ApiProperty({
    description: 'Company contact name',
    minLength: 1,
    maxLength: 150,
    required: true,
  })
  contactName: string;

  @MinLength(10)
  @IsOptional()
  @ApiProperty({
    description: 'Company contact phone number',
    minLength: 10,
    required: true,
  })
  contactPhone: string;

  @IsEmail()
  @Length(6, 50)
  @Transform(({ value }) => String(value).toLowerCase())
  @ApiProperty({
    description: 'Company contac emaill',
    minLength: 6,
    maxLength: 50,
    required: true,
  })
  contactEmail: string;

  @Length(5, 150)
  @ApiProperty({
    description: 'User creating the company id (comes from token)',
    minLength: 5,
    maxLength: 150,
    required: true,
  })
  userId: string;
}
