import { BaseEntity } from "src/core/entity/base.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { Floor } from "./floor.entity";



@Entity()
export class Building extends BaseEntity {

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    tel: string;

    @Column()
    usage: string;

    @Column()
    constructionCo: string;

    @Column({ type: 'date' })
    completionDt: Date;

    // 구조
    @Column()
    buildingStruct: string;

    @Column()
    roofStruct: string;

    // 면적
    @Column()
    grossFloorArea: string;

    @Column()
    siteArea: string;

    @Column()
    buildingArea: string;

    // 층
    @Column()
    totalFloor: string;

    @Column()
    groundFloor: string;

    @Column()
    basementFloor: string;

    // 높이
    @Column()
    totalHeight: string;

    @Column()
    groundHeight: string;

    @Column()
    basementHeight: string;

    // 주차
    @Column()
    totalParking: string;

    @Column()
    indoorParking: string;

    @Column()
    outdoorParking: string;

    // 전기
    @Column()
    electricalCapacity: string;

    @Column()
    receivingCapacity: string;

    @Column()
    powerCapacity: string;

    // 급수
    @Column()
    waterCapacity: string;

    @Column()
    elevatedWaterTankCapacity: string;

    @Column()
    waterTankCapacity: string;

    // 가스
    @Column()
    gasCapacity: string;

    @Column()
    heater: string;

    @Column()
    chillerHeater: string;

    // 승강기
    @Column()
    totalLift: string;

    @Column()
    passengerLift: string;

    @Column()
    FreightLift: string;

    // 냉난방
    @Column()
    coolHeatCapacity: string;

    @Column()
    heatCapacity: string;

    @Column()
    coolCapacity: string;

    // 조경
    @Column()
    totalLandscapeArea: string;

    @Column()
    groundLandscapeArea: string;

    @Column()
    basementLandscapeArea: string;

    // 화장실
    @Column()
    totalRestroom: string;

    @Column()
    mensRoom: string;

    @Column()
    ladiesRoom: string;

    // 소방 등급, 정화조 용량
    @Column()
    fireRating: string;

    @Column()
    cesspoolCapacity: string;

    @OneToMany(() => Floor, (floor) => floor.building)
    floor: Floor[];
}