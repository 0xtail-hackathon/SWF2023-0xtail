import * as dotenv from "dotenv";
dotenv.config();

export const DEPLOYED_CONTRACT_ADDRESS =
  "0x83bF1b7b52594598a946b728bc1C4d7d40F88d99";
export const DEPLOYED_TOKEN_CONTRACT_ADDRESS =
    "0x7A7E17B3b38b2B10caFc90B9f7bEED28AD542c5C";
export const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || "cb8b20f72574a84ab1a3cc24cc93fa49543d873287d69d9e85a4ee5703c04793";
export const DEPLOYER_PUBLIC_KEY = process.env.DEPLOYER_PUBLIC_KEY || "0x1bc52b02b903aa808366fc06d6c7ade2eb7c7c8c";
export const BUYER_PRIVATE_KEY = process.env.BUYER_PRIVATE_KEY || "611eab0d45946e49bf6ffedd9abc0381f02014512988b904e8b9d43a6f8c66b3";
export const BUYER_PUBLIC_KEY = process.env.BUYER_PUBLIC_KEY || "0x8fe24Dc7Fa3b15934E130792fb3D51eD6BBD3a13";

export const CRONOS_TESTNET_RPC = "https://evm-t3.cronos.org";

export const RATE = 1;