import { Controller, Get } from '@nestjs/common';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Application')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  // for testing our whole project is running or not
  @ApiOperation({ summary: 'Check application health' })
  @ApiResponse({ description: '{"message" : "OK"}', status: 200 })
  @Get()
  checkHealth(): string {
    return this.appService.checkHealth();
  }
}
