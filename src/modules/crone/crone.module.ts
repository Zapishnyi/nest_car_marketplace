import { Module } from '@nestjs/common';

import { PbExchangeRateModule } from '../pb-exchange-rate/pb-exchange-rate.module';
import { CroneService } from './services/crone.service';

@Module({
  imports: [PbExchangeRateModule],
  providers: [CroneService],
})
export class CroneModule {}
