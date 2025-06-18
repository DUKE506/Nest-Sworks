import { Column } from 'typeorm';

export class CreateRoom {
  @Column()
  floor: number;
  @Column()
  name: string;
}
