import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ApiModule } from '~/src/api/api.module';
import { CACHE_TTL } from '~/src/common/constants';
import { CacheHelper } from '~/src/common/helper/cache-helper';
import { LoggerModule } from '~/src/logger/logger.module';

import { getConfig } from './configuration/configuration';

export const commonRootModuleOptions = {
  imports: [
    ConfigModule.forRoot({
      load: [getConfig],
      cache: true,
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: CACHE_TTL,
    }),
    LoggerModule,
    HttpModule,
    ApiModule,
  ],
  providers: [CacheHelper],
};
