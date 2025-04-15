import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { ListModel } from 'src/core/dto/list-type.dto';

@Injectable()
export class WorkplaceService {
  constructor(
    @InjectRepository(Workplace)
    private workplaceRepository: Repository<Workplace>,
  ) {}

  async findAll(page: number, pageSize: number) {
    const [items, totalCount] = await this.workplaceRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        contractedAt: 'DESC',
      },
    });

    const data: ListModel<Workplace> = {
      meta: {
        totalCount,
        pageSize,
        page,
      },
      data: items,
    };

    return data;
  }

  async findOneById(id: number): Promise<Workplace | null> {
    const workplace = await this.workplaceRepository.findOne({
      where: { id },
    });
    return workplace;
  }

  async createWorkplace(
    createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<InsertResult> {
    return await this.workplaceRepository.insert(createWorkplaceDto);
  }
}
