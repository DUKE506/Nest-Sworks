import { Column, Entity, ManyToOne } from "typeorm";
import { Floor } from "./floor.entity";
import { BaseEntity } from "src/core/entity/base.entity";


@Entity()
export class Room extends BaseEntity {
    @Column()
    name: string;
    @ManyToOne(() => Floor, (floor) => floor.rooms)
    floor: Floor;
}