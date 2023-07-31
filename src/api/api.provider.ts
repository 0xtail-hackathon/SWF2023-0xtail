import { DataSource } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';

import { DATA_SOURCE, REPOSITORY } from '../common/constants';

export const entityProviders = [
  {
    provide: REPOSITORY.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
];
