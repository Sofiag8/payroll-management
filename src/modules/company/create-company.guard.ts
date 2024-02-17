import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CreateCompanyGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    request.body = { userId: user.userId, ...request.body };
    return true;
  }
}
