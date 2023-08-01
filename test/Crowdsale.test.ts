import { expect } from 'chai';
import { BigNumber, Contract, ContractFactory, Signer } from 'ethers';
import { ethers } from 'hardhat';
import {RATE, CAP, TEST_CAP} from "../constants";
import exp from "constants";

describe('Crowdsale', function () {
  let crowdsale: Contract;
  let owner: Signer;
  let buyer: Signer;
  let ownerAddress: string;
  let buyerAddress: string;

  before(async function () {
    const Crowdsale: ContractFactory = await ethers.getContractFactory('Crowdsale');

    [owner] = await ethers.getSigners();
    buyer = await ethers.Wallet.createRandom();
    ownerAddress = await owner.getAddress();
    buyerAddress = await buyer.getAddress();

    console.log(`ownerAddress: ${ownerAddress}`);
    console.log(`buyerAddress: ${buyerAddress}`);
    try {
      crowdsale = await Crowdsale.deploy(RATE, ownerAddress, TEST_CAP);
      await crowdsale.deployed();
    } catch (error) {
      console.error('Error during deployment:', error);
    }

  });

  it('should deploy the contract correctly', async function () {
    const cap = await crowdsale.cap();
    console.log(`cap = ${cap}`);
    expect(cap).to.equal(CAP);
    expect(crowdsale.address).to.not.equal(0);
  });

  it('should return 0 for funded amount before buyToken', async function () {
    const amount = await crowdsale.fundAmount(buyerAddress);
    expect(amount).to.equal(0);
  });

  it('should buyToken of amount and return fundAmount as funded', async function () {
    const tx = await crowdsale.buyTokens(buyerAddress, {value: 10});
    const res = await tx.wait();
    console.log(`event logs = ${res.events[0].args}`);
    const amount = await crowdsale.fundAmount(buyerAddress);
    console.log(amount);
    expect(amount).to.not.equal(0);
  });

  it('should buyToken of amount and return fundAmount as funded with same address', async function () {
    const tx = await crowdsale.buyTokens(buyerAddress, {value: 20});
    const res = await tx.wait();
    console.log(`event logs2 = ${res.events[0].args}`);
    const amount = await crowdsale.fundAmount(buyerAddress);
    console.log(amount);
    expect(amount).to.equal(30);
  });
});
