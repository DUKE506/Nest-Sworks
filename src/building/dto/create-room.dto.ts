import { Column } from "typeorm";


export class CreateRoom {
    @Column()
    name: string;
}