import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import http from 'http';
import https from 'https';

import { DEFAULT_HTTP_TIMEOUT } from '~/src/common/constants';
import { TransactionHelperService } from '~/src/common/external-service/transaction-helper/transaction-helper.service';
const httpAgent = new http.Agent({
  keepAlive: true,
  timeout: DEFAULT_HTTP_TIMEOUT,
  maxFreeSockets: 100,
  maxSockets: 1000,
});
const httpsAgent = new https.Agent({
  keepAlive: true,
  timeout: DEFAULT_HTTP_TIMEOUT,
  maxFreeSockets: 100,
  maxSockets: 1000,
});

@Module({
  imports: [HttpModule.register({ timeout: DEFAULT_HTTP_TIMEOUT, httpAgent, httpsAgent })],
  providers: [TransactionHelperService],
  exports: [TransactionHelperService],
})
export class TransactionHelperModule {}
