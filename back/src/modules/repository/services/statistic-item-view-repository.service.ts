import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { StatisticViewItemEntity } from '../../../database/entities/view-item.entity';

@Injectable()
export class StatisticItemViewRepository extends Repository<StatisticViewItemEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatisticViewItemEntity, dataSource.manager);
  }
}
