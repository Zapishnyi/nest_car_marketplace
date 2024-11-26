import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { PBExchangeRateService } from '../../pb-exchange-rate/services/pb-exchange-rate.service';

@Injectable()
export class CroneService {
  constructor(private readonly pbExchangeRateService: PBExchangeRateService) {}

  @Cron('0 0 12 * * *')
  async updateCurrencyExchangeRateCron() {
    await this.pbExchangeRateService.getRate();
  }
}
