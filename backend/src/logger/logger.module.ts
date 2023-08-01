import { Global, Module } from '@nestjs/common';

import { CommonLoggerService } from '~/src/logger/logger';

@Global()
@Module({
  imports: [],
  providers: [CommonLoggerService],
  exports: [CommonLoggerService],
})
export class LoggerModule {}
