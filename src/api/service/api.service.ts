import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Contract, ethers, JsonRpcProvider, TransactionReceipt, Wallet} from 'ethers';
import { Repository } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';
import { REPOSITORY } from '~/src/common/constants';
import { CommonLoggerService } from '~/src/logger/logger';
import {MyERC20, MyERC20__factory} from "~/src/typechain";
import {FundEntity} from "~/src/api/entity/fund.entity";
import {ArtifactEntity} from "~/src/api/entity/artifact.entity";
import {GenerateArtifactRequestDTO} from "~/src/api/dto/requestDTO";

@Injectable()
export class ApiService {
  private readonly ownerAddress: string;
  private readonly ownerPrivateKey: string;
  private wallet: Wallet;
  private erc20Contract: Contract

  constructor(
    private logger: CommonLoggerService,
    private configService: ConfigService,
    @Inject(REPOSITORY.USER)
    private userEntityRepository: Repository<UserEntity>,
    @Inject(REPOSITORY.USER)
    private fundEntityRepository: Repository<FundEntity>,
    @Inject(REPOSITORY.USER)
    private artifactEntityRepository: Repository<ArtifactEntity>,
  ) {
    this.ownerAddress = this.configService.get<string>('ownerAddress');
    this.ownerPrivateKey = this.configService.get<string>('ownerPrivateKey');
    this.wallet = new Wallet(this.ownerPrivateKey, new JsonRpcProvider("https://evm-dev-t3.cronos.org"))
    this.erc20Contract = new ethers.Contract(this.configService.get<string>('erc20ContractAddress'), MyERC20__factory.abi, this.wallet)
  }

  async createWallet(userName: string): Promise<Record<string, any>> {
    const user = await this.userEntityRepository.findOneBy({name: userName})
    if(user) {
      throw new NotFoundException('already exist user')
    }
    const wallet = ethers.Wallet.createRandom();
    const transfer = await this.wallet.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther('1')
    })
    const result = await transfer.wait();
    if(result.status) {
      await this.userEntityRepository.save(<UserEntity>{
        name: userName,
        address: wallet.address,
        privateKey: wallet.privateKey,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }else {
      throw new InternalServerErrorException('failed to transfer TCRO')
    }

    return {
      name: userName,
      address: wallet.address,
    };
  }

  async sendFund(userName: string, artifactName: string, amount: number): Promise<Record<string, any>> {
    const user = await this.userEntityRepository.findOneBy({name: userName})
    if(!user) {
      throw new NotFoundException('no user')
    }
    if(user.krw < amount) {
      throw new BadRequestException('not enough krw')
    }
    const result = await this.erc20Contract.mint(user.address, user.address)
    const receipt: TransactionReceipt = await result.wait();
    if(receipt.status) {
      await this.fundEntityRepository.save(<FundEntity>{
        userName,
        artifactName,
        amount,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return receipt;
  }

  async getFundByArtifactName(artifactName: string): Promise<Record<string, any>> {
    return await this.fundEntityRepository.findBy({artifactName});
  }

  async getArtifactByName(artifactName: string): Promise<Record<string, any>> {
    return await this.artifactEntityRepository.findOneBy({name:artifactName});
  }

  async generateArtifact(artifact: GenerateArtifactRequestDTO): Promise<Record<string, any>> {
    const address = '0x0NotImplNow';
    await this.artifactEntityRepository.save(<ArtifactEntity>{
      ...artifact,
      address: address,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return artifact;
  }
}
