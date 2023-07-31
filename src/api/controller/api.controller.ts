import { Body, Controller, Get, Post } from '@nestjs/common';

import {CreatWalletRequestDTO, SendFundRequestDTO} from '~/src/api/dto/requestDTO';
import { Response } from '~/src/api/dto/response';
import { SUCCESS_CODE } from '~/src/common/constants';
import { CommonLoggerService } from '~/src/logger/logger';

import { ApiService } from '../service/api.service';

@Controller('')
export class ApiController {
  constructor(private logger: CommonLoggerService, private apiService: ApiService) {}

  @Post('/wallet/create')
  async createWallet(@Body() request: CreatWalletRequestDTO): Promise<Response> {
    this.logger.debug(JSON.stringify(request));
    const userName: string = request.userName;
    const result = await this.apiService.createWallet(userName);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  @Post('/fund/send')
  async sendFund(@Body() request: SendFundRequestDTO): Promise<Response> {
    this.logger.debug(JSON.stringify(request));
    const userName: string = request.userName;
    const amount: number = request.amount;
    const result = await this.apiService.sendFund(userName, amount);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  // @Get('/fund/:id')
  // async getFundById(request: RequestDTO): Promise<Response> {
  //   const result = await this.apiService.getFundById();
  //   return <Response>{
  //     code: SUCCESS_CODE,
  //     data: result,
  //   };
  // }
  //
  // @Get('/fund/list')
  // async getFundList(request: RequestDTO): Promise<Response> {
  //   const result = await this.apiService.getFundList();
  //   return <Response>{
  //     code: SUCCESS_CODE,
  //     data: result,
  //   };
  // }
  //
  //
  //
  // @Post('/admin/fund/generate')
  // generateFund(request: RequestDTO): Response {
  //   const result = this.apiService.generateFund();
  //   return <Response>{
  //     code: SUCCESS_CODE,
  //     data: result,
  //   };
  // }
}
