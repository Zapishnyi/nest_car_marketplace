import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/Transform.helper';

export class MessageToManagerReqDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Message body',
  })
  public readonly message: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @IsOptional()
  @Transform(TransformHelper.trim)
  @ApiProperty({
    description: 'Missing brand name',
    example: 'BMW',
  })
  public readonly brand?: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  @Transform(TransformHelper.trim)
  @IsOptional()
  @ApiProperty({
    description: 'Missing model name',
    example: 'GSX',
  })
  public readonly model?: string;
}
