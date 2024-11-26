import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { StatisticViewListEntity } from '../../../database/entities/view-list.entity';

@Injectable()
export class StatisticListViewRepository extends Repository<StatisticViewListEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatisticViewListEntity, dataSource.manager);
  }
}
