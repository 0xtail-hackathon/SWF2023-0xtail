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
import {MyERC721__factory} from "~/contract/typechain-types";

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
    @Inject(REPOSITORY.FUND)
    private fundEntityRepository: Repository<FundEntity>,
    @Inject(REPOSITORY.ARTIFACT)
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
    this.logger.debug(JSON.stringify(result));

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
    const result = await this.erc20Contract.mint(user.address, amount)
    const receipt: TransactionReceipt = await result.wait();
    this.logger.debug(JSON.stringify(receipt));

    if(receipt.status) {
      this.logger.debug(JSON.stringify(<FundEntity>{
        userName: userName,
        artifactName: artifactName,
        amount: amount,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      await this.fundEntityRepository.save(<FundEntity>{
        userName: userName,
        artifactName: artifactName,
        amount: amount,
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
    const preArt = await this.artifactEntityRepository.findOneBy({name:artifact.name})
    if(preArt) {
      throw new BadRequestException('already exist artifact')
    }
    const erc721ContractFactory = new ethers.ContractFactory(MyERC721__factory.abi, MyERC721__factory.bytecode, this.wallet)
    const erc721Contract = await erc721ContractFactory.deploy('test721', 'TST', 'http://')
    // await erc721Contract.waitForDeployment()
    this.logger.debug(JSON.stringify(await erc721Contract.getAddress()))
    await this.artifactEntityRepository.save(<ArtifactEntity>{
      ...artifact,
      address: await erc721Contract.getAddress(),
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return artifact;
  }
}
