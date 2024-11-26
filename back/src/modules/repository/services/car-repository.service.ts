import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { CarQueryStatisticReqDto } from '../../cars/dto/req/car-query-statistic.req.dto';
import { CarsQueryReqDto } from '../../cars/dto/req/cars-query.req.dto';
import { ViewsEnum } from '../../cars/enums/views.enum';
import { ICarWithTotalRaw } from '../../cars/interfaces/ICarWithTotalRaw.interface';
import { CurrencyEnum } from '../../pb-exchange-rate/enums/currency.enum';
import { StatisticItemViewRepository } from './statistic-item-view-repository.service';
import { StatisticListViewRepository } from './statistic-list-view-repository.service';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly statisticViewListRepository: StatisticListViewRepository,
    private readonly statisticViewItemRepository: StatisticItemViewRepository,
  ) {
    super(CarEntity, dataSource.manager);
  }

  private async getDate(timeFrame: ViewsEnum): Promise<Date> {
    const result = new Date();
    switch (timeFrame) {
      case ViewsEnum.ALL_PERIOD:
        result.setFullYear(new Date().getFullYear() - 1);
        break;
      case ViewsEnum.LAST_MONTH:
        result.setMonth(new Date().getMonth() - 1);
        break;
      case ViewsEnum.Last_WEEK:
        result.setDate(new Date().getDate() - 7);
        break;
      case ViewsEnum.LAST_DAY:
        result.setDate(new Date().getDate() - 1);
        break;
    }
    return result;
  }

  public async search({
    limit,
    page,
    order,
    orderBy,
    brand,
    price_max,
    price_min,
    build_min,
    build_max,
    mileage_max,
    mileage_min,
    currency,
    model,
  }: CarsQueryReqDto): Promise<[ICarWithTotalRaw[], number]> {
    try {
      const subQuery = this.createQueryBuilder('car')
        .leftJoinAndSelect('car.rate', 'rate')
        .leftJoinAndSelect('car.brand', 'brand')
        .leftJoinAndSelect('car.model', 'model')
        .andWhere('active IS TRUE');
      switch (currency) {
        case CurrencyEnum.UAH:
          subQuery
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price
          
          WHEN car.currency = 'USD' 
          THEN car.price * rate.sale_usd
          
          WHEN car.currency = 'EUR' 
          THEN car.price * rate.sale_eur
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'UAH'`, 'car_currency_final');
          break;
        case CurrencyEnum.USD:
          subQuery
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price * rate.buy_usd
          
          WHEN car.currency = 'USD' 
          THEN car.price
          
          WHEN car.currency = 'EUR' 
          THEN car.price * rate.sale_eur / rate.buy_usd
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'USD'`, 'car_currency_final');
          break;
        case CurrencyEnum.EUR:
          subQuery
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price * rate.buy_eur
          
          WHEN car.currency = 'USD' 
          THEN car.price * rate.sale_usd / rate.buy_eur
          
          WHEN car.currency = 'EUR' 
          THEN car.price
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'EUR'`, 'car_currency_final');
          break;
      }
      const queryResult = this.createQueryBuilder()
        .select([
          'car_id',
          'brand_name',
          'model_name',
          'car_build',
          'car_mileage',
          'car_created',
          'car_description',
          'car_version',
          'car_updated',
          'car_price',
          'car_currency',
          'car_image',
          'car_price_calculated',
          'car_currency_final',
          'COUNT(*) OVER() as total_count', // Adding window function for total count
        ])
        .from(`(${subQuery.getQuery()})`, 'car_copy')
        .setParameters(subQuery.getParameters())
        .groupBy(
          'car_copy.car_id,' +
            'car_copy.brand_name,' +
            'car_copy.model_name,' +
            'car_copy.car_build,' +
            'car_copy.car_mileage,' +
            'car_copy.car_created,' +
            'car_copy.car_updated,' +
            'car_description,' +
            'car_version,' +
            'car_copy.car_price,' +
            'car_copy.car_currency,' +
            'car_copy.car_image,' +
            'car_copy.car_price_calculated,' +
            'car_copy.car_currency_final',
        );

      if (brand) {
        queryResult.andWhere('car_copy.brand_name ILIKE  :brand', {
          brand: `%${brand}%`,
        });
      }
      if (model) {
        queryResult.andWhere('car_copy.model_name  ILIKE  :model', {
          model: `%${model}%`,
        });
      }

      if (price_max) {
        queryResult.andWhere('car_copy.car_price_calculated <  :price_max', {
          price_max,
        });
      }
      if (price_min) {
        queryResult.andWhere('car_copy.car_price_calculated > :price_min ', {
          price_min,
        });
      }

      if (build_max) {
        queryResult.andWhere('car_copy.car_build < :build_max', {
          build_max,
        });
      }
      if (build_min) {
        queryResult.andWhere('car_copy.car_build > :build_min ', {
          build_min,
        });
      }
      if (mileage_max) {
        queryResult.andWhere('car_copy.car_mileage < :mileage_max', {
          mileage_max,
        });
      }
      if (mileage_min) {
        queryResult.andWhere('car_copy.car_mileage > :mileage_min', {
          mileage_min,
        });
      }

      const carsToGetTotal: ICarWithTotalRaw[] = await queryResult
        .limit(1)
        .offset(0)
        .getRawMany();
      const total = Number(carsToGetTotal[0]?.total_count || 0);

      queryResult
        .limit(limit)
        .offset((page - 1) * limit)
        .orderBy(`car_copy.${orderBy}`, order);
      const cars = await queryResult.getRawMany();
      // console.log('total', total);

      return [cars, total];
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getCar(
    car_id: string,
    { currency, views_list, views_item }: CarQueryStatisticReqDto,
  ): Promise<any> {
    try {
      const result = this.createQueryBuilder('car')
        .leftJoinAndSelect('car.rate', 'rate')
        .leftJoinAndSelect('car.brand', 'brand')
        .leftJoinAndSelect('car.model', 'model')
        .leftJoinAndSelect('car.location', 'location')
        .leftJoinAndSelect('car.user', 'user')
        .andWhere('active IS TRUE')
        .andWhere('car.id = :car_id', { car_id: `${car_id}` });
      if (views_list) {
        result
          .leftJoin('car.statistic_views_list', 'statistic_views_list')
          .addSelect(
            `COUNT(CASE WHEN statistic_views_list.created >= :startDate 
            AND statistic_views_list.created <= :endDate THEN 1 ELSE NULL END)`,
            'statistic_views_list_count',
          )
          .setParameters({
            endDate: new Date(),
            startDate: await this.getDate(views_list),
          })
          .groupBy('statistic_views_list.id');
      }
      if (views_item) {
        result
          .leftJoinAndSelect('car.statistic_views_item', 'statistic_views_item')
          .addSelect(
            `COUNT(CASE WHEN statistic_views_item.created >= :startDateItem 
            AND statistic_views_item.created <= :endDateItem THEN 1 ELSE NULL END)`,
            'statistic_views_item_count',
          )
          .setParameters({
            endDateItem: new Date(),
            startDateItem: await this.getDate(views_item),
          })
          .groupBy('statistic_views_item.id');
      }

      switch (currency) {
        case CurrencyEnum.UAH:
          result
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price
          
          WHEN car.currency = 'USD' 
          THEN car.price * rate.sale_usd
          
          WHEN car.currency = 'EUR' 
          THEN car.price * rate.sale_eur
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'UAH'`, 'car_currency_final');
          break;
        case CurrencyEnum.USD:
          result
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price * rate.buy_usd
          
          WHEN car.currency = 'USD' 
          THEN car.price
          
          WHEN car.currency = 'EUR' 
          THEN car.price * rate.sale_eur / rate.buy_usd
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'USD'`, 'car_currency_final');
          break;
        case CurrencyEnum.EUR:
          result
            .addSelect(
              `CASE
          WHEN car.currency = 'UAH' 
          THEN car.price * rate.buy_eur
          
          WHEN car.currency = 'USD' 
          THEN car.price * rate.sale_usd / rate.buy_eur
          
          WHEN car.currency = 'EUR' 
          THEN car.price
          END`,
              `car_price_calculated`,
            )
            .addSelect(`'EUR'`, 'car_currency_final');
          break;
      }
      result.groupBy(
        'car.id, rate.marker, brand.name, model.id, location.city, user.id',
      );
      const car = await result.getRawOne();
      console.log('car', car);
      return car;
    } catch (err) {
      throw new Error(err);
    }
  }
}
