import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { CurrencyEnum } from '../../enums/currency.enum';

export class CarQueryReqDto {
  @IsEnum(CurrencyEnum)
  @ApiProperty({
    default: CurrencyEnum.UAH,
  })
  currency: CurrencyEnum;
}
