import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class RpcMessageParameters {
  @ApiProperty()
  @IsOptional()
  @Transform((string_) => String(string_.value).toLowerCase())
  from?: string;

  @ApiProperty()
  @IsOptional()
  @Transform((string_) => String(string_.value).toLowerCase())
  to?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  value?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gas?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  gasPrice?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  data?: string;
}

export class RpcMessage {
  @ApiProperty()
  @IsString()
  jsonrpc: string;

  @ApiProperty()
  @IsString()
  method: string;

  @ApiProperty()
  params: (RpcMessageParameters | string)[];

  @ApiProperty()
  @IsNumber()
  id: number;
}
