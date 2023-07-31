const DEFAULT_STAGE = 'local';
const JEST_TEST_STAGE = 'test';
const DEFAULT_APP_NAME = 'jmeter-test-api-server';
const DEFAULT_HTTP_PORT = 18_083;
const DEFAULT_DOMAIN_URL = 'http://127.0.0.1';
const DEFAULT_DATABASE_HOST = '127.0.0.1';
const DEFAULT_DATABASE_PORT = 3308;

export interface Configuration {
  appName: string;
  httpPort: number;
  domainUrl: string;
  stage: string;
  port: number;
  host: string;
  ownerAddress: string;
  ownerPrivateKey: string;
  erc20ContractAddress: string;
}
export type ConfigurationKeys = keyof Configuration;

export function getConfig(): Configuration {
  const defaultStage = process.env.NODE_ENV === JEST_TEST_STAGE ? JEST_TEST_STAGE : DEFAULT_STAGE;

  return {
    appName: process.env.LUNVS_APP_NAME || DEFAULT_APP_NAME,
    stage: process.env.STAGE || defaultStage,
    httpPort: Number.parseInt(process.env.HTTP_PORT) || DEFAULT_HTTP_PORT,
    domainUrl: process.env.DOMAIN_URL || DEFAULT_DOMAIN_URL,
    host: process.env.DB_HOST || DEFAULT_DATABASE_HOST,
    port: Number.parseInt(process.env.DB_PORT) || DEFAULT_DATABASE_PORT,
    ownerAddress: process.env.OWNER_ADDRESS,
    ownerPrivateKey: process.env.OWNER_PRIVATE_KEY,
    erc20ContractAddress: process.env.ERC20_CONTRACT_ADDRESS,
  };
}
