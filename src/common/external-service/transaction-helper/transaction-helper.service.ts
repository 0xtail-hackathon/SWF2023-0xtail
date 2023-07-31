import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

import { RpcMessage } from '~/src/common/external-service/transaction-helper/dto/rpc-request';
import { RpcError, RpcResponse } from '~/src/common/external-service/transaction-helper/dto/rpc-response';
import { RpcCallExecutionFailedException } from '~/src/common/external-service/transaction-helper/exception/rpc-call-execution-failed-exception';
import { RpcCallFailedException } from '~/src/common/external-service/transaction-helper/exception/rpc-call-failed-exception';
import { isAxiosError } from '~/src/common/helper/axios-error-helper';
import { CommonLoggerService } from '~/src/logger/logger';
// eslint-disable-next-line camelcase

function handleRpcCallError(error: RpcError, logger: CommonLoggerService) {
  const code = error.code;
  const errorMessage = `RPC call error: code=${code}, message=${error.message}`;
  logger.debug(errorMessage);
  throw new RpcCallFailedException();
}

function handleRpcExecutionError(error: unknown, logger: CommonLoggerService) {
  if (isAxiosError(error)) {
    if (error.message.includes('ENOTFOUND') || error.response?.status === 404) {
      const errorMessage = `Not found rpc server Error`;
      logger.debug(errorMessage);
      throw new NotFoundException();
    }

    const code = error.code || error.response?.status || 'unknown';
    const errorMessage = `Rpc execution error, unknown error: code=${code}, message=${
      error.message
    }, toJSON=${JSON.stringify(error.toJSON())}`;
    logger.debug(errorMessage);
    throw new RpcCallExecutionFailedException();
  }
  const errorMessage = `RPC execution error, unknown error: ${String(error)}`;
  logger.debug(errorMessage);
  throw new InternalServerErrorException();
}

@Injectable()
export class TransactionHelperService {
  private readonly internalRouterEndpoint: string;

  constructor(
    private logger: CommonLoggerService,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.internalRouterEndpoint = this.configService.get<string>('internalRouterEndpoint');
  }

  // NOTE: lambda-chain-api 에서 RPC 호출시 id 를 발급하는 방식을 가지고 옴.
  generateReqId(): number {
    const hrTime = process.hrtime();
    const requestId = hrTime[0] * 1_000_000_000 + hrTime[1];
    return requestId;
  }

  async executeTransaction(url: string, signedTransaction: string): Promise<string> {
    const message: RpcMessage = {
      jsonrpc: '2.0',
      method: 'eth_sendRawTransaction',
      params: [signedTransaction],
      id: this.generateReqId(),
    };

    let response: undefined | AxiosResponse<RpcResponse>;

    this.logger.debug(`>> request, url: ${url}, messages: ${JSON.stringify(message)}`);
    try {
      response = (await lastValueFrom(this.httpService.post<RpcResponse>(url, message))) as AxiosResponse<RpcResponse>;
    } catch (error: unknown) {
      handleRpcExecutionError(error, this.logger);
    }

    this.logger.debug(`>> response, url: ${url}, data: ${JSON.stringify(response.data.result)}`);

    if (response.data.error) {
      handleRpcCallError(response.data.error, this.logger);
    }
    return response.data.result;
  }
}
