import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entity';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { ListModel } from 'src/core/dto/list-type.dto';
import { WorkplaceAdmin } from './entities/workplace-admin.entity';
import { Transactional } from 'typeorm-transactional';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { DetailWorkplaceDto } from './dto/detail-workplace.dto';
import { EditPermDto } from './dto/edit-perm.dto';
import { CreateUser } from 'src/user/dto/create-user.dto';
import * as Inko from 'inko';

@Injectable()
export class WorkplaceService {
  constructor(
    @InjectRepository(Workplace)
    private workplaceRepository: Repository<Workplace>,
    @InjectRepository(WorkplaceAdmin)
    private workplaceAdminRepository: Repository<WorkplaceAdmin>,

    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  /**
   * 사업장 전체조회
   * @param page
   * @param pageSize
   * @returns
   */
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

  /**
   * 사업장 아이디 조회
   * @param id
   * @returns
   */
  async findOneById(id: number): Promise<Workplace | null> {
    const workplace = await this.workplaceRepository.findOne({
      where: { id },
      relations: ['workplaceAdmins.user'],
    });
    return workplace;
  }

  /**
   * 사업장 상세조회
   * @param id
   * @returns
   */
  async findDetailById(id: number): Promise<DetailWorkplaceDto | null> {
    const res = await this.workplaceRepository.findOne({
      where: { id },
      relations: ['workplaceAdmins.user', 'workplaceAdmins.user.department'],
    });

    if (!res) {
      return null;
    }

    const { workplaceAdmins, ...rest } = res;

    let filterWorkplaceAdmins = workplaceAdmins.map(
      ({ user, ...rest }) => user,
    );

    const detailWorkplace: DetailWorkplaceDto = {
      ...rest,
      workplaceAdmins: filterWorkplaceAdmins,
    };

    return detailWorkplace;
  }

  /**
   * 사업장생성
   * @param createWorkplaceDto
   * @returns
   */
  async createWorkplace(
    createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<Workplace> {
    const { name, tel } = createWorkplaceDto;
    const workplace = await this.workplaceRepository.save(createWorkplaceDto);

    const password = new (Inko as any)().ko2en(name);

    const createUser: CreateUser = {
      name: name,
      account: name,
      password,
      email: `name@s-tec.co.kr`,
      phone: tel,
      permission: 'USER',
      basicPerm: 2,
      machinePerm: 2,
      electricPerm: 2,
      firePerm: 2,
      buildingPerm: 2,
      networkPerm: 2,
      beautyPerm: 2,
      securityPerm: 2,
      userPerm: 2,
      vocPerm: 2,
    };

    await this.userService.createUser(createUser, workplace.id);

    return workplace;
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

  async editPerm(perms: EditPermDto, id: number): Promise<UpdateResult> {
    const res = await this.workplaceRepository.update(id, {
      ...perms,
    });
    console.log(res);
    return res;
  }
}
