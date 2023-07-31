import { HttpStatus } from '@nestjs/common';

import { BaseHttpException } from './base-http-exception';

export class CommonException extends BaseHttpException {
  constructor(message: string, httpStatus: HttpStatus, code?: string) {
    super(message, httpStatus, code);
  }
}
