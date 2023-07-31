import path from 'path';
import { DataSource } from 'typeorm';

import { getConfig } from '~/src/configuration/configuration';

export const databaseProviders = {
  provide: 'DATA_SOURCE',
  useFactory: async () => {
    const config = getConfig();
    const dataSource = new DataSource({
      type: 'mysql',
      host: config.host,
      port: Number(config.port),
      username: 'rooter',
      password: 'rooter123@',
      database: 'rooter',
      entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
      cache: false,
      dateStrings: false,
    });

    return dataSource.initialize();
  },
};
