import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';

@Entity('show_list')
export class ShowListEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  car_id: string;

  @CreateDateColumn()
  created: Date;
  @ManyToOne(() => CarEntity, (entity) => entity.shows_in_list, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
