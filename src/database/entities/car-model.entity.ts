import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseModel } from './base_model/base.model';
import { CarEntity } from './car.entity';
import { CarBrandEntity } from './car-brand.entity';

@Entity('car_model')
export class CarModelEntity extends BaseModel {
  @Column('text')
  name: string;

  @ManyToOne(() => CarBrandEntity, (entity) => entity.models, {
    onDelete: 'CASCADE',
  })
  brand: CarBrandEntity;

  @OneToMany(() => CarEntity, (entity) => entity.model)
  cars?: CarEntity[];
}
