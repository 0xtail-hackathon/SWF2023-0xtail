import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get('/healthcheck')
  healthcheck(): string {
    return 'I am Healthy!';
  }
}
