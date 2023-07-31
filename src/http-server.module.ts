import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { RequestContextMiddleware } from '~/src/context';

import { commonRootModuleOptions } from './common-root-module-options';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [...commonRootModuleOptions.imports],
  providers: [...commonRootModuleOptions.providers],
  exports: [],
  controllers: [HealthCheckController],
})
export class HttpServerModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestContextMiddleware).exclude('healthcheck').forRoutes('*');
  }
}
