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
  ) {}

  async findAllBuilding(workplaceid: number) {
    return await this.buildingRepository.find({
      where: { workplace: { id: workplaceid } },
    });
  }

  async createBuilding(building: CreateBuilding, workplaceId: number) {
    return await this.buildingRepository.insert({
      ...building,
      workplace: { id: workplaceId },
    });
  }

  //식별자 조회
  async findOneById(id: number) {
    return await this.buildingRepository.findOne({ where: { id } });
  }

  async findOneByName(name: string) {
    return await this.buildingRepository.findOne({ where: { name } });
  }

  /**
   * 사업장 내 건물 명칭 조회
   * @param workplaceid
   * @returns
   */
  async findAllBuildingName(workplaceid: number) {
    return await this.buildingRepository.find({
      select: { id: true, name: true },
      where: { workplace: { id: workplaceid } },
    });
  }

  /**
   * 층
   */
  async findAllFloor(buildingid: number) {
    const building = await this.findOneById(buildingid);

    if (!building) {
      throw new NotFoundException(`건물이 존재하지 않습니다.`);
    }

    return await this.floorRepository.find({
      relations: { rooms: true },
      where: { building: { id: buildingid } },
    });
  }

  async createFloor(floor: CreateFloor, buildingid: number) {
    const building = await this.findOneById(buildingid);

    if (!building) {
      throw new NotFoundException(`건물이 존재하지 않습니다.`);
    }

    return await this.floorRepository.save({ ...floor, building });
  }

  async findOneFloorById(buildingid: number, floorid: number) {
    const building = await this.findOneById(buildingid);

    if (!building) {
      throw new NotFoundException(`건물이 존재하지 않습니다.`);
    }

    return await this.floorRepository.findOne({
      where: { id: floorid, building: { id: building.id } },
    });
  }

  /**
   * 위치
   */

  async findOneRoomById(id: number) {
    const room = await this.roomRepository.findOne({ where: { id } });

    if (!room) {
      throw new NotFoundException(`층이 존재하지 않습니다.`);
    }
    return room;
  }

  async createRoom(room: CreateRoom, buildingid: number) {
    const floor = await this.findOneFloorById(buildingid, room.floor);
    if (!floor) {
      throw new NotFoundException(`층이 존재하지 않습니다.`);
    }

    return await this.roomRepository.save({ ...room, floor: { id: floor.id } });
  }

  /**
   * 건물, 층, 위치 조회
   */
  async findAllLocationTree(workplaceid: number) {
    return await this.buildingRepository.find({
      relations: { floors: { rooms: true } },
    });
  }
}
