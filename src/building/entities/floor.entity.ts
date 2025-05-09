import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Building } from './building.entity';
import { Room } from './room.entity';

@Entity()
export class Floor extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Building, (building) => building.floors)
  building: Building;

  @OneToMany(() => Room, (room) => room.floor)
  rooms: Room[];
}
