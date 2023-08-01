import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CommonResponse<T> {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  result?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty()
  data?: T;
}
