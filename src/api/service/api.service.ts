import {BadRequestException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers, JsonRpcProvider, TransactionReceipt, Wallet} from 'ethers';
import { Repository } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';
import { REPOSITORY } from '~/src/common/constants';
import { CommonLoggerService } from '~/src/logger/logger';
import {MyERC721__factory} from "~/src/typechain";
import {FundEntity} from "~/src/api/entity/fund.entity";
import {ArtifactEntity} from "~/src/api/entity/artifact.entity";
import {GenerateArtifactRequestDTO} from "~/src/api/dto/requestDTO";
import {CrowdSaleEntity} from "~/src/api/entity/crowd-sale.entity";

const CrowdsaleAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "rate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "cap",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "weiRaised",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "capReached",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "wallet",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "weiMap",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "fundAmount",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_beneficiary",
        "type": "address"
      }
    ],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_rate",
        "type": "uint256"
      },
      {
        "name": "_wallet",
        "type": "address"
      },
      {
        "name": "_cap",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "purchaser",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "beneficiary",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokenPurchase",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "weiRaised",
        "type": "uint256"
      },
      {
        "indexed": true,
        "name": "cap",
        "type": "uint256"
      }
    ],
    "name": "CapReached",
    "type": "event"
  }
];
const CrowdsaleBytecode = "0x608060405234801561001057600080fd5b5060405160608061075983398101806040528101908080519060200190929190805190602001909291908051906020019092919050505060008311151561005657600080fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561009257600080fd5b6000811115156100a157600080fd5b82600181905550816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600481905550505050610658806101016000396000f30060806040526004361061008e576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632c4e722e14610099578063355274ea146100c45780634042b66f146100ef5780634f9359451461011a578063521eb2731461014957806353b0706f146101a0578063b82ffdf9146101f7578063ec8ac4d81461024e575b61009733610284565b005b3480156100a557600080fd5b506100ae61033e565b6040518082815260200191505060405180910390f35b3480156100d057600080fd5b506100d9610344565b6040518082815260200191505060405180910390f35b3480156100fb57600080fd5b5061010461034e565b6040518082815260200191505060405180910390f35b34801561012657600080fd5b5061012f610354565b604051808215151515815260200191505060405180910390f35b34801561015557600080fd5b5061015e610363565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101ac57600080fd5b506101e1600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610388565b6040518082815260200191505060405180910390f35b34801561020357600080fd5b50610238600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506103a0565b6040518082815260200191505060405180910390f35b610282600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610284565b005b60008034915061029483836103e9565b61029d826104c7565b90506102b4826002546104e590919063ffffffff16565b6002819055506102c48382610501565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f623b3804fa71d67900d064613da8f94b9617215ee90799290593e1745087ad188484604051808381526020018281526020019250505060405180910390a361033961050f565b505050565b60015481565b6000600454905090565b60025481565b60006004546002541015905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60036020528060005260406000206000915090505481565b6000600360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415151561042557600080fd5b6000811415151561043557600080fd5b60045461044d826002546104e590919063ffffffff16565b111515156104c3576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040180806020018281038252600b8152602001807f636170207265616368656400000000000000000000000000000000000000000081525060200191505060405180910390fd5b5050565b60006104de6001548361055090919063ffffffff16565b9050919050565b600081830190508281101515156104f857fe5b80905092915050565b61050b8282610588565b5050565b600454600254141561054e576004546002547f55f8a908242314dd6704f630f917b013106727771872b3d736c7da50a4a585bb60405160405180910390a35b565b6000808314156105635760009050610582565b818302905081838281151561057457fe5b0414151561057e57fe5b8090505b92915050565b600080600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205491506105e083836104e590919063ffffffff16565b905080600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505050505600a165627a7a723058204f70bb3fcd2a386c38aa86f8a81d6441c450f8ad83c4efb9d3cffc8ceb9d1a730029";
const CrowdsaleRate = 1;
@Injectable()
export class ApiService {
  private readonly ownerAddress: string;
  private readonly ownerPrivateKey: string;
  private wallet: Wallet;

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
    let crowdsaleCA = await this.getCrowdsaleCAByName(artifactName);
    let crowdsale = new ethers.Contract(crowdsaleCA, CrowdsaleAbi, this.wallet)

    const result = await crowdsale.buyTokens(user.address, {value: amount, from: this.ownerAddress})
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

  async getCrowdsaleByName(artifactName: string): Promise<Record<string, any>> {
    return await this.crowdSaleEntityRepository.findOneBy({name:artifactName});
  }

  async getCrowdsaleCAByName(artifactName: string): Promise<string> {
    let crowdsale = await this.getCrowdsaleByName(artifactName);
    return crowdsale.address;
  }

  async getErc721CAByName(artifactName: string): Promise<string> {
    let artifact = await this.getArtifactByName(artifactName);
    return artifact.address;
  }

  async getArtifacts(): Promise<Record<string, any>> {
    return await this.artifactEntityRepository.find();
  }

  async getFundedUsersByArtifact(artifactName: string): Promise<Record<string, any>[]> {
    return await this.fundEntityRepository.findBy({artifactName});
  }

  async getUserEOAByName(name: string): Promise<Record<string, any>> {
    let userEntity = await this.getUserByName(name);
    return userEntity.address;
  }

  async getUserByName(name: string): Promise<Record<string, any>> {
    return await this.userEntityRepository.findOneBy({name});
  }

  async generateArtifact(artifact: GenerateArtifactRequestDTO): Promise<Record<string, any>> {
    const preArt = await this.artifactEntityRepository.findOneBy({name:artifact.name})
    if(preArt) {
      throw new BadRequestException('already exist artifact')
    }
    const crowdsaleContractFactory = new ethers.ContractFactory(CrowdsaleAbi, CrowdsaleBytecode, this.wallet)
    const crowdsaleContract = await crowdsaleContractFactory.deploy(CrowdsaleRate, this.ownerAddress, artifact.value);
    const erc721ContractFactory = new ethers.ContractFactory(MyERC721__factory.abi, MyERC721__factory.bytecode, this.wallet)
    const erc721Contract = await erc721ContractFactory.deploy(artifact.name, "ROOT", artifact.imgUrl)
    this.logger.debug(JSON.stringify(await erc721Contract.getAddress()))
    this.logger.debug(JSON.stringify(await crowdsaleContract.getAddress()))
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
      address: await crowdsaleContract.getAddress(),
      value: artifact.value,
      startDate: artifact.startDate,
      expiredDate: artifact.expiredDate,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return artifact;
  }

  async closeCrowdsale(artifactName: string): Promise<Record<string, any>> {
    const userList: Record<string, any>[] = await this.getFundedUsersByArtifact(artifactName);
    const returnList: any[] = [];
    const artifactErc721CA = await this.getErc721CAByName(artifactName);
    const artifactErc721 = new ethers.Contract(artifactErc721CA, MyERC721__factory.abi, this.wallet);

    for (let i = 0; i < userList.length; i++) {
      console.log(JSON.stringify(userList[i]));
      const userEoa = await this.getUserEOAByName(userList[i].userName);
      try {
        const result = await artifactErc721.mint(userEoa);
        const receipt: TransactionReceipt = await result.wait();
        this.logger.debug(JSON.stringify(receipt));
        returnList.push({
          username: userList[i].userName,
          txHash: receipt.hash,
        });
      } catch (error) {
        console.log(`Error during minting for user ${userList[i].userName}: ${error}`);
      }
    }
    return returnList;

    }

}
