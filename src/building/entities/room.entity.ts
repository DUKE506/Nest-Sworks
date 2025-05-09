import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Floor } from './floor.entity';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Facility } from 'src/facility/entities/facility.enrity';

@Entity()
export class Room extends BaseEntity {
  @Column()
  name: string;
  @ManyToOne(() => Floor, (floor) => floor.rooms)
  floor: Floor;
  @OneToMany(() => Facility, (facilities) => facilities.room)
  facilities: Facility[];
}
