import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import http from 'http';
import https from 'https';

import { entityProviders } from '~/src/api/api.provider';
import { ApiController } from '~/src/api/controller/api.controller';
import { ApiService } from '~/src/api/service/api.service';
import { DatabaseModule } from '~/src/database/database.module';

import { DEFAULT_HTTP_TIMEOUT } from '../common/constants';
import { CacheHelper } from '../common/helper/cache-helper';

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
  imports: [
    HttpModule.register({ timeout: DEFAULT_HTTP_TIMEOUT, httpAgent, httpsAgent }),
    CacheModule.register(),
    DatabaseModule,
  ],
  controllers: [ApiController],
  providers: [CacheHelper, ApiService, ...entityProviders],
})
export class ApiModule {}
