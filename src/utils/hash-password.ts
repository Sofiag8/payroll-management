import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function hashPassword(plaintextPassword: string) {
  try {
    return bcrypt.hash(plaintextPassword, 10);
  } catch (error) {
    throw new InternalServerErrorException(
      'Internal server error while hashing password',
    );
  }
}
