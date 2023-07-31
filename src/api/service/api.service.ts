import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { Repository } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';
import { REPOSITORY } from '~/src/common/constants';
import { CommonLoggerService } from '~/src/logger/logger';

@Injectable()
export class ApiService {
  private ownerAddress: string;
  private readonly ownerPrivateKey: string;

  constructor(
    private logger: CommonLoggerService,
    private configService: ConfigService,
    @Inject(REPOSITORY.USER)
    private apiEntityRepository: Repository<UserEntity>,
  ) {
    this.ownerAddress = this.configService.get<string>('ownerAddress');
    this.ownerPrivateKey = this.configService.get<string>('ownerPrivateKey');
  }

  async createWallet(userName: string): Promise<Record<string, any>> {
    const wallet = ethers.Wallet.createRandom();
    await this.apiEntityRepository.save(<UserEntity>{
      userName,
      address: wallet.address,
      privateKey: wallet.privateKey,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      userName,
      address: wallet.address,
    };
  }

  async getFundById(): Promise<Record<string, any>> {
    return {};
  }

  async getFundList(): Promise<Record<string, any>> {
    return {};
  }

  async sendFund(): Promise<Record<string, any>> {
    return {};
  }

  async generateFund(): Promise<Record<string, any>> {
    return {};
  }
}
