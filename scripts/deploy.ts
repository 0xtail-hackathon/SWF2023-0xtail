import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import {CAP, DEPLOYER_PUBLIC_KEY, RATE} from "../constants";

const deploy = {
  /**
   * Main function to deploy the Crowdsale contract.
   * @returns {Promise<void>}
   */
  async main(): Promise<void> {
    try {
      //
      // const RootToken: ContractFactory = await ethers.getContractFactory(
      //     'RootToken'
      // );
      // const rootToken: Contract = await RootToken.deploy();
      //
      // await rootToken.deployed();
      //
      // console.log('RootTokenContract deployed to:', rootToken.address);

      const Crowdsale: ContractFactory = await ethers.getContractFactory(
          'Crowdsale'
      );
      const crowdsale: Contract = await Crowdsale.deploy(RATE, DEPLOYER_PUBLIC_KEY, CAP);

      await crowdsale.deployed();

      console.log('CrowdsaleContract deployed to:', crowdsale.address);
    } catch (error) {
      console.log(error);
    }
  },
};

deploy
    .main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
