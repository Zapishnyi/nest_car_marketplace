import { PickType } from '@nestjs/swagger';

import { CarQueryBaseReqDto } from './car-query-base.req.dto';

export class CarQueryStatisticReqDto extends PickType(CarQueryBaseReqDto, [
  'currency',
  'views_item',
  'views_list',
]) {}
