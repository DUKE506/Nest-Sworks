import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facility } from './entities/facility.enrity';
import { Repository } from 'typeorm';
import { CreateFacility } from './dto/create-facility.dto';
import { BuildingService } from 'src/building/building.service';

@Injectable()
export class FacilityService {
  constructor(
    @InjectRepository(Facility)
    private facilityRepository: Repository<Facility>,

    @Inject(forwardRef(() => BuildingService))
    private buildingService: BuildingService,
  ) {}

  async findFacility(workplaceid: number, buildingid: number, type: string) {
    //where 조건
    const whereCondition: any = {
      room: {
        floor: {
          building: {},
        },
      },
    };

    //건물 조건 설정
    if (buildingid === 0) {
      whereCondition.room.floor.building.workplace = { id: workplaceid };
    } else {
      whereCondition.room.floor.building = { id: buildingid };
    }

    if (type !== '전체') {
      whereCondition.category = type;
    }

    const res = await this.facilityRepository.find({
      relations: {
        room: {
          floor: {
            building: true,
          },
        },
      },
      where: whereCondition,
    });

    return res;
  }

  async createFacility(createFacility: CreateFacility) {
    const { room, ...rest } = createFacility;

    const hasRoom = await this.buildingService.findOneRoomById(room);
    console.log('==============');
    console.log(rest.name);

    const res = this.facilityRepository.save({
      name: rest.name,
      category: rest.category,
      type: rest.type,
      standard: rest.standard,
      count: rest.count,
      life: rest.life,
      setDt: rest.setDt,
      changeDt: rest.changeDt,
      room: hasRoom,
    });

    return res;
  }
}
