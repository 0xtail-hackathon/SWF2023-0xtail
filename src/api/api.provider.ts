import { DataSource } from 'typeorm';

import { UserEntity } from '~/src/api/entity/user.entity';

import { DATA_SOURCE, REPOSITORY } from '../common/constants';
import {FundEntity} from "~/src/api/entity/fund.entity";
import {ArtifactEntity} from "~/src/api/entity/artifact.entity";

export const entityProviders = [
  {
    provide: REPOSITORY.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity),
    inject: [DATA_SOURCE],
  },
  {
    provide: REPOSITORY.FUND,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FundEntity),
    inject: [DATA_SOURCE],
  },
  {
    provide: REPOSITORY.ARTIFACT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ArtifactEntity),
    inject: [DATA_SOURCE],
  },
];
