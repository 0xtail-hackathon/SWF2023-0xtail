import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseHttpException extends HttpException {
  public code?: string;
  constructor(message: string, status: HttpStatus, code?: string) {
    super(
      {
        code,
        message,
      },
      status,
    );
    this.code = code;
  }
}
