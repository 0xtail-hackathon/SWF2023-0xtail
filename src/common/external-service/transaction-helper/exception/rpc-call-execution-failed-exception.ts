import { HttpStatus } from '@nestjs/common';
import { HttpStatusCode } from 'axios';

import { BaseHttpException } from '~/src/common/exception/base-http-exception';

export class RpcCallExecutionFailedException extends BaseHttpException {
  constructor(message?: unknown[]) {
    super(message.join(','), HttpStatus.INTERNAL_SERVER_ERROR, HttpStatusCode.InternalServerError.toString());
  }
}
