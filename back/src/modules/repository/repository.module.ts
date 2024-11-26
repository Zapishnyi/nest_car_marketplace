import { Module } from '@nestjs/common';

import { CarBrandRepository } from './services/car-brand-repository.service';
import { CarModelRepository } from './services/car-model-repository.service';
import { CarRepository } from './services/car-repository.service';
import { LocationRepository } from './services/location-repository.service';
import { RateRepository } from './services/rate-repository.service';
import { RefreshTokenRepository } from './services/refresh-token-repository.service';
import { StatisticItemViewRepository } from './services/statistic-item-view-repository.service';
import { StatisticListViewRepository } from './services/statistic-list-view-repository.service';
import { UserRepository } from './services/user-repository.service';

@Module({
  providers: [
    CarBrandRepository,
    RefreshTokenRepository,
    StatisticItemViewRepository,
    StatisticListViewRepository,
    UserRepository,
    RateRepository,
    CarRepository,
    CarModelRepository,
    LocationRepository,
  ],
  exports: [
    CarBrandRepository,
    RefreshTokenRepository,
    StatisticItemViewRepository,
    StatisticListViewRepository,
    UserRepository,
    RateRepository,
    CarRepository,
    CarModelRepository,
    LocationRepository,
  ],
})
export class RepositoryModule {}
