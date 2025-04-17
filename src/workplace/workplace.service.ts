import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { ListModel } from 'src/core/dto/list-type.dto';
import { WorkplaceAdmin } from './entities/workplcae-admin.entity';
import { Transactional } from 'typeorm-transactional';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class WorkplaceService {
  constructor(
    @InjectRepository(Workplace)
    private workplaceRepository: Repository<Workplace>,
    @InjectRepository(WorkplaceAdmin)
    private workplaceAdminRepository: Repository<WorkplaceAdmin>,
    private userService: UserService,
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
      relations: ['workplaceAdmins.user'],
    });
    return workplace;
  }

  async createWorkplace(
    createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<InsertResult> {
    return await this.workplaceRepository.insert(createWorkplaceDto);
  }

  @Transactional()
  async addWorkplaceAdmin(id: number, admins: User[]) {
    const workplace = await this.findOneById(id);
    if (!workplace) {
      throw new NotFoundException(`사업장이 존재하지 않습니다.`);
    }

    for (const admin of admins) {
      const isExistAdmin = await this.userService.findOneById(admin.id);
      if (!isExistAdmin) {
        throw new NotFoundException(`관리자가 존재하지 않습니다. ${admin}`);
      }

      const res = await this.workplaceAdminRepository.insert({
        workplace: workplace,
        user: admin,
      });

      return res;
    }
  }
}
