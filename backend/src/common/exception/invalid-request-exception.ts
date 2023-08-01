import { HttpStatus, ValidationError } from '@nestjs/common';

import { BaseHttpException } from './base-http-exception';
export class InvalidRequestException extends BaseHttpException {
  constructor(message?: ValidationError[]) {
    super(message.join(','), HttpStatus.INTERNAL_SERVER_ERROR, `500}`);
  }
}
