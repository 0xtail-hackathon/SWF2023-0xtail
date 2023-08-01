import {
    BUYER_PUBLIC_KEY,
    DEPLOYED_CROWDSALE_CONTRACT_ADDRESS,
    DEPLOYED_TOKEN_CONTRACT_ADDRESS,
    DEPLOYER_PUBLIC_KEY
} from "../constants";
import { ethers } from 'hardhat';



const buyToken = {
    async main(): Promise<void> {
        try {
            // const tokenContract = await ethers.getContractAt('RootToken', DEPLOYED_TOKEN_CONTRACT_ADDRESS);
            // const amountToSend = ethers.utils.parseUnits('10', 18);
            // const tx = await tokenContract.transfer(DEPLOYED_CROWDSALE_CONTRACT_ADDRESS, amountToSend, {from: DEPLOYER_PUBLIC_KEY})
            // console.log(`token transfer transaction hash: ${tx.hash}`);
            // await tx.wait();
            // console.log(`token transfer transaction confirmed.`);
            //
            // const balance = await tokenContract.balanceOf(DEPLOYED_CROWDSALE_CONTRACT_ADDRESS);
            // console.log(`crowdsale token balance: ${balance}`);

            const crowdsaleContract = await ethers.getContractAt('Crowdsale', DEPLOYED_CROWDSALE_CONTRACT_ADDRESS);

            const capReached = await crowdsaleContract.capReached();
            console.log(`capReached: ${capReached}`);

            const amountToBuy = ethers.utils.parseUnits('10', 18);
            const buyTx = await crowdsaleContract.buyTokens(BUYER_PUBLIC_KEY, {value: amountToBuy, from: DEPLOYER_PUBLIC_KEY});
            console.log(`buyTx transaction hash: ${buyTx.hash}`);
            await buyTx.wait();
            console.log(`buyTx transaction confirmed.`);

            // const buyerBalance = await tokenContract.balanceOf(BUYER_PUBLIC_KEY);
            // console.log(`buyer balance: ${buyerBalance}`);

        } catch (e) {
            console.log(e);
        }
    },
}

buyToken
    .main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
