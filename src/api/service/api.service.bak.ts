// import { JsonRpcProvider } from '@ethersproject/providers';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { Wallet } from 'ethers';
//
// import { MintNftResponseData } from '~/src/api/dto/get-multi-account-balance-reponse';
// import { TransactionHelperService } from '~/src/common/external-service/transaction-helper/transaction-helper.service';
// import { CommonLoggerService } from '~/src/logger/logger';
// // eslint-disable-next-line camelcase
// import { LuCaERC721V3__factory } from '~/src/typechain';
//
// @Injectable()
// export class ApiService {
//   private ownerAddress: string;
//   private readonly ownerPrivateKey: string;
//
//   constructor(
//     private logger: CommonLoggerService,
//     private configService: ConfigService,
//     private transactionHelperService: TransactionHelperService,
//   ) {
//     this.ownerAddress = this.configService.get<string>('ownerAddress');
//     this.ownerPrivateKey = this.configService.get<string>('ownerPrivateKey');
//   }
//
//   async createWallet(): Promise<MintNftResponseData> {
//     const signer = new Wallet(
//         this.ownerPrivateKey,
//         // new JsonRpcProvider('http://baas-rpc.luniverse-dev.net:8545/lChainId/1688611573825052505/key/luni'),
//
//         new JsonRpcProvider('http://10.40.81.162:8545'),
//     );
//
//     const erc721Factory = new LuCaERC721V3__factory(signer);
//     this.erc721Contract = await erc721Factory.deploy(
//         'SAB',
//         'SAB',
//         '0xaFcBc76F9092212FE53269cFb27068ea27cD7F05',
//         '"ipfs://baseuri-for-metadata"',
//         {
//           nonce: await this.getNonce(),
//           gasPrice: 5000,
//           gasLimit: 8_000_000,
//         },
//     );
//   }
//
//   async initNft(): Promise<MintNftResponseData> {
//     const signer = new Wallet(
//       this.ownerPrivateKey,
//       // new JsonRpcProvider('http://baas-rpc.luniverse-dev.net:8545/lChainId/1688611573825052505/key/luni'),
//
//       new JsonRpcProvider('http://10.40.81.162:8545'),
//     );
//
//     const erc721Factory = new LuCaERC721V3__factory(signer);
//     this.erc721Contract = await erc721Factory.deploy(
//       'SAB',
//       'SAB',
//       '0xaFcBc76F9092212FE53269cFb27068ea27cD7F05',
//       '"ipfs://baseuri-for-metadata"',
//       {
//         nonce: await this.getNonce(),
//         gasPrice: 5000,
//         gasLimit: 8_000_000,
//       },
//     );
//   }
//
//   async mintNft(): Promise<MintNftResponseData> {
//     // const urls = ['http://10.40.81.162:8545', 'http://10.40.82.121:8545', 'http://10.40.81.236:8545'];
//     //
//     // const nonce = await this.getNonce();
//     //
//     // const address = '0xe688b84b23f322a994A53dbF8E15FA82CDB71127';
//     // const target = Date.now() % 3;
//     //
//     // const rawTransaction = {
//     //   to: this.erc721Contract.address,
//     //   chainId: +BigNumber.from(0x4_85_d2).toHexString(),
//     //   gasPrice: BigNumber.from(5000).toHexString(),
//     //   gasLimit: BigNumber.from(300_000).toHexString(),
//     //   data: this.erc721Contract.interface.encodeFunctionData('mintForMetadataWithHashes', [
//     //     address,
//     //     1,
//     //     Number.parseInt(nonce),
//     //     [ethers.utils.randomBytes(32)],
//     //   ]),
//     //   nonce: BigNumber.from(nonce).toHexString(),
//     // };
//     //
//     // // sign the transaction
//     // const signedTx = await this.erc721Contract.signer.signTransaction(rawTransaction);
//     // await this.transactionHelperService.executeTransaction(urls[target], signedTx);
//     // return <MintNftResponseData>{};
//   }
//
//   async mintNftPromise(): Promise<MintNftResponseData> {
//     // const urls = ['http://10.40.81.162:8545', 'http://10.40.82.121:8545', 'http://10.40.81.236:8545'];
//     // const nonce = await this.getNonce();
//     // this.erc721Contract.connect(new Wallet(this.ownerPrivateKey, new JsonRpcProvider(urls[Date.now() % urls.length])));
//     // const address = '0xF748734dfbf46022B797DC130D5842B4A98D7d60';
//     //
//     // const mintForMetadataWithHashes = await this.erc721Contract.mintForMetadataWithHashes(
//     //   address,
//     //   1,
//     //   Number.parseInt(nonce),
//     //   [ethers.utils.randomBytes(32)],
//     //   {
//     //     nonce,
//     //     gasPrice: 5000,
//     //     gasLimit: 1_000_000,
//     //   },
//     // );
//     //
//     // return <MintNftResponseData>{};
//   }
// }
