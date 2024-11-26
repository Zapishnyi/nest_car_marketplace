import { PickType } from '@nestjs/swagger';

import { CarQueryBaseReqDto } from './car-query-base.req.dto';

export class CarQueryReqDto extends PickType(CarQueryBaseReqDto, [
  'currency',
]) {}
