import { Controller, Get } from '@nestjs/common';
import { Public } from 'nest-keycloak-connect';

@Controller()
export class HealthController {
  constructor() {}

  @Public()
  @Get()
  getHealthService(): string {
    return 'App health service';
  }
}
