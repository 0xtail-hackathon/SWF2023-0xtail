import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { CACHE_TTL } from '../constants';

export class CacheHelper {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: boolean): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    await this.cacheManager.set(key, value, CACHE_TTL);
  }

  async get(key: string): Promise<string> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
    return await this.cacheManager.get(key);
  }
}
