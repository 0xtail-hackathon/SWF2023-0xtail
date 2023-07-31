import { Injectable, LoggerService } from '@nestjs/common';
import { TransformableInfo } from 'logform';
import * as winston from 'winston';
/* eslint-disable */

const { transports, createLogger, format } = winston;

@Injectable()
export class CommonLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor() {
    this.createLogger('log.txt');
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public log(message: string): void {
    this.logger.log("debug", message);
  }

  public error(message: string, trace?: string): void {
    if (trace) {
      this.logger.error(`${message}\n${trace}`);
    } else {
      this.logger.error(message);
    }
  }

  private createLogger(filename: string) {
    this.logger = createLogger({
      level: 'debug',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf((info: TransformableInfo) => {
          return `[${info.timestamp}] [${info.level}] ${info.message}`;
        }),
      ),
      transports: [
        // new transports.File({
        new transports.Console({
          format: format.combine(
            format.colorize({ all: true }),
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.printf((info: TransformableInfo) => {
              return `[${info.timestamp}] [${info.level}] ${info.message}`;
            }),
          ),
        }),
      ],
    });
  }
}
