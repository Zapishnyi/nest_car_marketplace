import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CarEntity } from './car.entity';

@Entity('show_chosen')
export class ShowChosenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text', { unique: true })
  car_id: string;

  @CreateDateColumn()
  created: Date;
  @ManyToOne(() => CarEntity, (entity) => entity.shows_chosen, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
