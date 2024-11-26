import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

import { CurrencyEnum } from '../../../pb-exchange-rate/enums/currency.enum';
import { ViewsEnum } from '../../enums/views.enum';

export class CarQueryBaseReqDto {
  @IsEnum(CurrencyEnum)
  @ApiProperty({
    default: CurrencyEnum.UAH,
  })
  currency: CurrencyEnum;

  @IsEnum(ViewsEnum)
  @IsOptional()
  views_list?: ViewsEnum;

  @IsEnum(ViewsEnum)
  @IsOptional()
  views_item?: ViewsEnum;
}
