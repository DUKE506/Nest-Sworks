import { Room } from 'src/building/entities/room.entity';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Facility extends BaseEntity {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column()
  standard: string;

  @Column()
  count: number;

  @Column()
  life: string;

  @Column()
  setDt: Date;

  @Column()
  changeDt: Date;

  @ManyToOne(() => Room, (room) => room.facilities)
  room: Room;
}
