import { Expose } from 'class-transformer';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

export class CommonHeader {
  @Expose({ name: 'x-environment-id' })
  @IsNumberString()
  'x-environment-id': string;

  @Expose({ name: 'x-request-id' })
  @IsUUID()
  @IsOptional()
  'x-request-id'?: string;
}
