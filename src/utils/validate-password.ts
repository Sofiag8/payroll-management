import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function validatePassword(
  plaintextPassword: string,
  hash: string,
) {
  try {
    const result = await bcrypt.compare(plaintextPassword, hash);
    return result;
  } catch (error) {
    throw new InternalServerErrorException(
      'Internal server error while validating password',
    );
  }
}
