import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voc } from './entities/voc.entity';
import { In, Repository } from 'typeorm';
import { CreateVoc } from './dto/create-voc.dto';
import { BuildingService } from 'src/building/building.service';
import { WorkplaceService } from 'src/workplace/workplace.service';

@Injectable()
export class VocService {
  constructor(
    @InjectRepository(Voc)
    private vocRepository: Repository<Voc>,

    @Inject(forwardRef(() => BuildingService))
    private buildingService: BuildingService,

    @Inject(forwardRef(() => WorkplaceService))
    private workplaceService: WorkplaceService,
  ) {}

  /**
   * 민원 생성(수기입력)
   * @param createVoc
   * @returns
   */
  async createVocHandWrite(createVoc: CreateVoc) {
    const hasBuilding = await this.buildingService.findOneByName(
      createVoc.building,
    );

    if (!hasBuilding) {
      throw new NotFoundException('건물이 존재하지 않습니다.');
    }
    const { building, ...rest } = createVoc;

    const res = this.vocRepository.insert({
      ...rest,
      building: hasBuilding,
      channel: '수기입력',
    });

    return res;
  }

  /**
   * 전체 민원조회
   * @param workplaceid
   * @returns
   */
  async findAllVoc(
    workplaceid: number,
    channel: string[],
    location: string[],
    type: string[],
    status: string[],
  ) {
    const workplace = await this.workplaceService.findOneById(workplaceid);
    if (!workplace) {
      throw new NotFoundException('사업장이 존재하지 않습니다.');
    }

    const whereCondition: any = {
      building: { workplace: { id: workplace.id } },
    };

    if (channel.length) {
      whereCondition.channel = In(channel);
    }

    if (location.length) {
      whereCondition.location = In(location);
    }
    if (type.length) {
      whereCondition.type = In(type);
    }
    if (status.length) {
      whereCondition.status = In(status);
    }

    const res = await this.vocRepository.find({
      relations: { building: true },
      where: whereCondition,
    });

    return res;
  }
}
