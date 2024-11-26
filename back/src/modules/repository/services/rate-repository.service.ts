import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RateEntity } from '../../../database/entities/rate.entity';
import { IPBExchangeRate } from '../interface/IPB-ExchangeRate.inteface';

@Injectable()
export class RateRepository extends Repository<RateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RateEntity, dataSource.manager);
  }

  public async updateCurrency(currency: IPBExchangeRate[]) {
    await this.save({
      marker: 'marker',
      buy_eur: currency[0].buy,
      sale_eur: currency[0].sale,
      buy_usd: currency[1].buy,
      sale_usd: currency[1].sale,
    });
  }
}
