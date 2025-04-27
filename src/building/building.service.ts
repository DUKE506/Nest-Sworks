import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { CreateBuilding } from './dto/create-buliding.dto';
import { Floor } from './entities/floor.entity';
import { CreateFloor } from './dto/create-floor.dto';
import { NotFoundError } from 'rxjs';
import { CreateRoom } from './dto/create-room.dto';
import { Room } from './entities/room.entity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,

    @InjectRepository(Floor)
    private floorRepository: Repository<Floor>,

    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) { }

  async findAllBuilding() {
    return await this.buildingRepository.find({});
  }

  async createBuilding(building: CreateBuilding) {
    return await this.buildingRepository.insert(building);
  }

  async findOneById(id: number) {
    return await this.buildingRepository.findOne({ where: { id } });
  }

  /**
   * 층
   */
  async findAllFloor(buildingid: number) {
    const building = await this.findOneById(buildingid);


    if (!building) {
      throw new NotFoundException(`건물이 존재하지 않습니다.`)
    }


    return await this.floorRepository.find({
      relations: { rooms: true },
      where: { building: { id: buildingid } }
    })
  }

  async createFloor(floor: CreateFloor, buildingid: number) {
    const building = await this.findOneById(buildingid);

    if (!building) {
      throw new NotFoundException(`건물이 존재하지 않습니다.`)
    }

    return await this.floorRepository.save({ ...floor, building })
  }

  async findOneFloorById(buildingid: number, floorid: number) {
    const building = await this.findOneById(buildingid);

    if (!building) {
      throw new NotFoundException(`건물이 존재하지 않습니다.`)
    }

    return await this.floorRepository.findOne({
      where: { id: floorid, building: { id: building.id } }
    })
  }


  /**
   * 위치
   */

  async createRoom(room: CreateRoom, buildingid: number, floorid: number) {

    const floor = await this.findOneFloorById(buildingid, floorid);
    if (!floor) {
      throw new NotFoundException(`층이 존재하지 않습니다.`)
    }

    return await this.roomRepository.save({ ...room, floor: { id: floorid } })
  }
}
