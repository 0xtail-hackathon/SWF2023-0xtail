import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {ethers, JsonRpcProvider, Wallet} from 'ethers';
import { Repository } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';
import { REPOSITORY } from '~/src/common/constants';
import { CommonLoggerService } from '~/src/logger/logger';
import {MyERC20, MyERC20__factory} from "~/src/typechain";

@Injectable()
export class ApiService {
  private readonly ownerAddress: string;
  private readonly ownerPrivateKey: string;
  private wallet: Wallet;
  private erc20Contract: MyERC20

  constructor(
    private logger: CommonLoggerService,
    private configService: ConfigService,
    @Inject(REPOSITORY.USER)
    private apiEntityRepository: Repository<UserEntity>,
  ) {
    this.ownerAddress = this.configService.get<string>('ownerAddress');
    this.ownerPrivateKey = this.configService.get<string>('ownerPrivateKey');
    this.wallet = new Wallet(this.ownerPrivateKey, new JsonRpcProvider("https://evm-dev-t3.cronos.org"))
    this.erc20Contract = MyERC20__factory.connect(this.configService.get<string>('erc20ContractAddress'))
    this.erc20Contract.connect(this.wallet)
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

  async sendFund(userName: string, amount: number): Promise<Record<string, any>> {
    const user = await this.apiEntityRepository.findOneBy({userName})
    if(!user) {
      throw new NotFoundException('no user')
    }
    if(user.krw < amount) {
      throw new BadRequestException('not enough krw')
    }

    const result = await this.erc20Contract.mint(user.address, user.address)
    const receipt = await result.wait();
    return receipt;
  }

  async getFundById(): Promise<Record<string, any>> {
    return {};
  }

  async getFundList(): Promise<Record<string, any>> {
    return {};
  }



  async generateFund(): Promise<Record<string, any>> {
    return {};
  }
}
