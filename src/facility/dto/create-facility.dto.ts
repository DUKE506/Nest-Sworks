import { Column } from 'typeorm';

export class CreateFacility {
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

  @Column()
  room: number;
}
