import { ArgumentsHost, Catch, HttpException, HttpServer, HttpStatus, Injectable } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request, Response } from 'express';

import { CommonErrorResponse } from '~/src/common/dto/error';
import { BaseHttpException } from '~/src/common/exception/base-http-exception';
import { CommonException } from '~/src/common/exception/common-exception';
import { CommonLoggerService } from '~/src/logger/logger';

@Injectable()
@Catch()
export class GlobalExceptionsFilter extends BaseExceptionFilter {
  constructor(private logger: CommonLoggerService, applicationReference?: HttpServer) {
    super(applicationReference);
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    if (exception instanceof HttpException || exception instanceof BaseHttpException) {
      // this.logger.debug(JSON.stringify(exception.getResponse()));
      const commonException = this.sendCustomHttpException(exception);
      super.catch(commonException, host);
      return;
    }
    if (exception instanceof Error || typeof exception === 'string') {
      const request = context.getRequest<Request>();
      this.logUnexpectedError(exception, request);
    }
    this.sendInternalErrorResponse(exception, response);
  }

  sendCustomHttpException(exception: BaseHttpException): HttpException {
    return new CommonException(exception.message, exception.getStatus());
  }

  sendInternalErrorResponse(exception: unknown, response: Response): void {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const error = exception as CommonErrorResponse;
    const statusCode = error.response?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.message.toString() || 'An unexpected error has occurred';
    response.status(statusCode).json({
      result: false,
      status: statusCode,
      message,
    });
  }

  logUnexpectedError(error: Error | string, request: Request): void {
    let message = 'An unexpected error has occurred';
    if (typeof error === 'string') {
      message += `: ${error}`;
    }

    if (typeof error !== 'string') {
      message += error.stack ? `: ${error.stack}` : `: ${error.toString()}`;
    }

    message += ` while handling request: ${JSON.stringify(
      {
        method: request.method,
        path: request.path,
        headers: request.headers,
        params: request.params,
        query: request.query,
        body: request.body, // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      },
      null,
      2,
    )}`;

    this.logger.error(message);
  }
}
