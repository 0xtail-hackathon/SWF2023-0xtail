import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class PaginationQuery {
  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  rpp: number;
}

export class GetAccountBalanceQuery {
  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  contract: string;
}
