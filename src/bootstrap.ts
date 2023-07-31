import { Server } from 'node:http';

import { ConsoleLogger, INestApplication, RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { InvalidRequestException } from '~/src/common/exception/invalid-request-exception';
import { GlobalExceptionsFilter } from '~/src/common/global-exceptions-filter';
import { CommonLoggerService } from '~/src/logger/logger';

import { ConfigurationKeys, getConfig } from './configuration/configuration';
import { HttpServerModule } from './http-server.module';

function setupApiDocument(app: INestApplication, prefix?: string): void {
  const documentConfig = new DocumentBuilder()
    .addBearerAuth()
    .addServer(prefix)
    .setTitle('Luniverse Nest Template')
    .setDescription('Luniverse Nest Template Api')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup(`${prefix}/api`, app, document, { swaggerOptions: { defaultModelsExpandDepth: -1 } });
}

function setupKeepAliveTimeoutToPreventBadGatewayError(app: INestApplication) {
  const httpAdapter = app.getHttpAdapter();
  const server: Server = httpAdapter.getHttpServer() as Server;

  server.headersTimeout = 66 * 1000; // NOTE: https://github.com/vercel/next.js/discussions/16544#discussion-15240
  server.keepAliveTimeout = 65 * 1000; // NOTE: https://ivorycirrus.github.io/TIL/aws-alb-502-bad-gateway/ https://adamcrowder.net/posts/node-express-api-and-aws-alb-502/
}

function setupGlobalPipes(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      // whitelist: true,
      // forbidNonWhitelisted: true,
      validationError: {
        target: false,
      },
      exceptionFactory: (errors) => {
        return new InvalidRequestException(errors);
      },
    }),
  );
}

export async function bootstrapHttpServer(): Promise<NestExpressApplication> {
  const config = getConfig();
  const app = await NestFactory.create<NestExpressApplication>(HttpServerModule, {
    logger: config.stage === 'test' ? false : new ConsoleLogger(),
  });

  app.enableCors();
  setupKeepAliveTimeoutToPreventBadGatewayError(app);

  const loggerService = new CommonLoggerService();
  app.useLogger(loggerService);

  const DEFAULT_GLOBAL_PREFIX = '/v1'; // jmeter-test-api-server
  setupApiDocument(app, DEFAULT_GLOBAL_PREFIX);

  const prefix = process.env.GLOBAL_PREFIX || DEFAULT_GLOBAL_PREFIX;
  app.setGlobalPrefix(prefix, {
    exclude: [{ path: 'healthcheck', method: RequestMethod.GET }],
  });

  setupGlobalPipes(app);
  const httpAdapter = app.getHttpAdapter();
  app.useGlobalFilters(new GlobalExceptionsFilter(loggerService, httpAdapter));

  const portConfigKey: ConfigurationKeys = 'httpPort';
  const port = config[portConfigKey];

  loggerService.log(`start listening to port: ${port}`);
  await app.listen(port);

  return app;
}
