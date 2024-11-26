import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';

@Entity('view-list')
export class StatisticViewListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  car_id: string;

  @CreateDateColumn()
  created: Date;

  @ManyToOne(() => CarEntity, (entity) => entity.statistic_views_list, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
