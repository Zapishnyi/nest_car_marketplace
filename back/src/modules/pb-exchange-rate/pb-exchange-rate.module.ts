import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { PBExchangeRateService } from './services/pb-exchange-rate.service';

@Module({
  imports: [RepositoryModule],
  providers: [PBExchangeRateService],
  exports: [PBExchangeRateService],
})
export class PbExchangeRateModule {}
