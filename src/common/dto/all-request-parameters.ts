import { IsString } from 'class-validator';

export class BaseProtocolAndNetworkParameter {
  @IsString()
  protocol: string;

  @IsString()
  network: string;
}

export class GetAccountBalanceParameter extends BaseProtocolAndNetworkParameter {
  @IsString()
  address: string;
}
