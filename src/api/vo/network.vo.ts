import { IsArray, IsString } from 'class-validator';

export class NetworkVo {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsArray()
  endpoints: string[];
}
