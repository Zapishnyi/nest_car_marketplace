import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';

@Entity('view-item')
export class StatisticViewItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  car_id: string;

  @CreateDateColumn()
  created: Date;
  @ManyToOne(() => CarEntity, (entity) => entity.statistic_views_item, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
