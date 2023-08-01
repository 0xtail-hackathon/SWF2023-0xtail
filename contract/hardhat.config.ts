import '@nomiclabs/hardhat-waffle';
import 'hardhat-gas-reporter';
import {DEPLOYER_PRIVATE_KEY} from "./constants";


const config = {
  solidity: "0.4.23",
  networks: {
    cronosTestnet: {
      url: 'https://evm-t3.cronos.org',
      chainId: 338,
      accounts: [DEPLOYER_PRIVATE_KEY],
      gasPrice: 'auto',
    },
  }
};

export default config;