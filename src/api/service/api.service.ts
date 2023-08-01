import {BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Contract, ethers, JsonRpcProvider, TransactionReceipt, Wallet} from 'ethers';
import { Repository } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';
import { REPOSITORY } from '~/src/common/constants';
import { CommonLoggerService } from '~/src/logger/logger';
import {MyERC20, MyERC20__factory, MyERC721__factory} from "~/src/typechain";
import {FundEntity} from "~/src/api/entity/fund.entity";
import {ArtifactEntity} from "~/src/api/entity/artifact.entity";
import {GenerateArtifactRequestDTO} from "~/src/api/dto/requestDTO";
import {CrowdSaleEntity} from "~/src/api/entity/crowd-sale.entity";
import {ar} from "date-fns/locale";

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
    @Inject(REPOSITORY.CROWD_SALE)
    private crowdSaleEntityRepository: Repository<CrowdSaleEntity>,
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
      await this.userEntityRepository.save(<UserEntity>{
        name: userName,
        address: wallet.address,
        privateKey: wallet.privateKey,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

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
    // TODO buyTokens
    const result = await this.erc20Contract.mint(user.address, amount)
    const receipt: TransactionReceipt = await result.wait();
    this.logger.debug(JSON.stringify(receipt));

    if(receipt.status) {
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

  async getArtifacts(): Promise<Record<string, any>> {
    return await this.artifactEntityRepository.find();
  }

  async generateArtifact(artifact: GenerateArtifactRequestDTO): Promise<Record<string, any>> {
    const preArt = await this.artifactEntityRepository.findOneBy({name:artifact.name})
    if(preArt) {
      throw new BadRequestException('already exist artifact')
    }
    // TODO crodSale deploy logic 추가
    const erc721ContractFactory = new ethers.ContractFactory(MyERC721__factory.abi, MyERC721__factory.bytecode, this.wallet)
    const erc721Contract = await erc721ContractFactory.deploy(artifact.name, "ROOT", artifact.imgUrl)
    // await erc721Contract.waitForDeployment()
    this.logger.debug(JSON.stringify(await erc721Contract.getAddress()))
    await this.artifactEntityRepository.save(<ArtifactEntity>{
      name: artifact.name,
      address: await erc721Contract.getAddress(),
      excavationLocation: artifact.excavationLocation,
      currentLocation: artifact.currentLocation,
      era: artifact.era,
      category: artifact.category,
      size: artifact.size,
      collectionNumber: artifact.collectionNumber,
      imgUrl: artifact.imgUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    await this.crowdSaleEntityRepository.save(<CrowdSaleEntity>{
      name: artifact.name,
      // FIXME: crowdsale 로 주소 바꾸기
      address: await erc721Contract.getAddress(),
      value: artifact.value,
      startDate: artifact.startDate,
      expiredDate: artifact.expiredDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return artifact;
  }
}
