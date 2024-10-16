import { Injectable, Logger } from '@nestjs/common';

import { IPBExchangeRate } from '../../repository/interface/IPB-ExchangeRate.inteface';
import { RateRepository } from '../../repository/services/rate-repository.service';

@Injectable()
export class PBExchangeRateService {
  constructor(private readonly rateRepository: RateRepository) {}

  public async getRate() {
    try {
      const currency: IPBExchangeRate[] = await fetch(
        'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11',
      ).then((response) => response.json());
      await this.rateRepository.updateCurrency(currency);
      Logger.log(
        `Currency exchange rate updated successfully on ${new Date().toISOString()}.`,
      );
    } catch (error) {
      Logger.error(
        `Currency exchange rate update failed on ${new Date().toISOString()}: ${error}`,
      );
    }
  }
}
