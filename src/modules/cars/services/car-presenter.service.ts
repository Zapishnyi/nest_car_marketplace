import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AwsConfig, EnvConfigType } from '../../../configs/envConfigType';
import { CarEntity } from '../../../database/entities/car.entity';
import { CarsQueryReqDto } from '../dto/req/cars-query.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarCreateResDto } from '../dto/res/car-create.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { ICarWithTotalRaw } from '../interfaces/ICarWithTotalRaw.interface';

@Injectable()
export class CarPresenterService {
  constructor(private readonly configService: ConfigService<EnvConfigType>) {}

  public RawToResponseDto(raw: ICarWithTotalRaw): CarResDto {
    const awsConfig = this.configService.get<AwsConfig>('aws');
    return {
      id: raw.car_id,
      brand: raw.brand_name,
      model: raw.model_name,
      mileage: raw.car_mileage,
      build: raw.car_build,
      description: raw.car_description,
      image: raw.car_image.length
        ? raw.car_image.map((path) => `${awsConfig.bucketURL}/${path}`)
        : [],
      price_initial: raw.car_price,
      currency_initial: raw.car_currency,
      price_calculated: Number(raw.car_price_calculated.toFixed(2)),
      currency_requested: raw.car_currency_final,
      location_city: raw.location_city,
      location_region: raw.location_region,
      location_country: raw.location_country,
      owner_id: raw.user_id,
      owner_first_name: raw.user_first_name,
      owner_last_name: raw.user_last_name,
      owner_email: raw.user_email,
      owner_phone: raw.user_phone,
    };
  }

  public entityToResponseDto(entity: CarEntity): CarCreateResDto {
    return {
      id: entity.id,
      brand: entity.brand.name,
      model: entity.model.name,
      mileage: entity.mileage,
      build: entity.build,
      description: entity.description,
      image: entity.image,
      price_initial: entity.price,
      currency_initial: entity.currency,
    };
  }

  public toResponseListDto(
    [carRaw, total]: [ICarWithTotalRaw[], number],
    {
      limit,
      page,
      order,
      orderBy,
      model,
      brand,
      city,
      area,
      currency,
      price_min,
      price_max,
      build_min,
      build_max,
      mileage_min,
      mileage_max,
    }: CarsQueryReqDto,
  ): CarListResDto {
    return {
      data: carRaw.map((carRaw) => this.RawToResponseDto(carRaw)),
      total,
      limit,
      page,
      pages: Math.ceil(total / limit),
      order,
      orderBy,
      currency,
      brand,
      model,
      city,
      area,
      price_min,
      price_max,
      build_min,
      build_max,
      mileage_min,
      mileage_max,
    };
  }
}
