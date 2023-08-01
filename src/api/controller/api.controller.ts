import {Body, Controller, Get, Param, Post} from '@nestjs/common';

import {CreatWalletRequestDTO, GenerateArtifactRequestDTO, SendFundRequestDTO} from '~/src/api/dto/requestDTO';
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
    const artifactName: string = request.artifactName;
    const amount: number = request.amount;
    const result = await this.apiService.sendFund(userName, artifactName, amount);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  @Get('/fund/:name')
  async getFundByArtifactName(@Param('name') fundName: string): Promise<Response> {
    const result = await this.apiService.getFundByArtifactName(fundName);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  @Post('/artifact/generate')
  async generateFund(@Body()request: GenerateArtifactRequestDTO): Promise<Response> {
    this.logger.debug(JSON.stringify(request));
    const result = await this.apiService.generateArtifact(request);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  @Get('/artifact/:name')
  async getArtifactByName(@Param('name') artifactName: string): Promise<Response> {
    const result = await this.apiService.getArtifactByName(artifactName);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  @Get('/crowdsale/:name')
  async getCrowdsaleCAByName(@Param('name') artifactName: string): Promise<Response> {
    const result = await this.apiService.getCrowdsaleCAByName(artifactName);
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  @Get('/artifacts')
  async getArtifacts(): Promise<Response> {
    const result = await this.apiService.getArtifacts();
    return <Response>{
      code: SUCCESS_CODE,
      data: result,
    };
  }

  // TODO 환수 완료 API (ADMIN)
}
