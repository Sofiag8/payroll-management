import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  constructor() {}

  @Get()
  getHealthService(): string {
    return 'App health service'
  }
}
