import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entity';
import { In, InsertResult, Like, Not, Repository, UpdateResult } from 'typeorm';
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
  async findAll(
    page: number,
    pageSize: number,
    search?: string,
    status?: string | string[],
  ) {
    // console.log('=====================');
    // console.log('page : ', page);
    // console.log('pageSize : ', pageSize);
    // console.log('search : ', search);
    // console.log('status : ', status);

    const whereCondition: any = {};

    whereCondition.name = Like(`%${search}%`);
    whereCondition.state =
      Array.isArray(status) && status.length > 0 ? In(status) : status;

    const [items, totalCount] = await this.workplaceRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: {
        contractedAt: 'DESC',
      },
      where: whereCondition,
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

  /**
   * ==============관리자==============
   */

  /**
   * 관리자에게 추가되지않은 사업장 조회
   * @param id
   */
  async findRestWorkplaceById(id: number) {
    const hasAdmin = await this.userService.findAdminDetailById(id);
    if (!hasAdmin) return new NotFoundException('관리자가 존재하지 않습니다.');

    //현재 본인 할당된 사업장 조회
    const addedWorkplace = await this.workplaceAdminRepository.find({
      where: { user: { id: hasAdmin.id } },
      relations: { workplace: true },
    });

    const addedWorkplaceIds = addedWorkplace.map(
      (admin) => admin.workplace?.id,
    );

    //나머지 할당된 사업장을 제외한 사업장 조회
    //관계 필드에서  Like, In, Not 등... 사용불가
    // id를 배열화 시켜 id비교
    const restWorkplace = await this.workplaceRepository.find({
      relations: { workplaceAdmins: true },
      where:
        addedWorkplaceIds.length > 0 ? { id: Not(In(addedWorkplaceIds)) } : {},
    });

    return restWorkplace;
  }

  /**
   * 관리자 담당 사업장 추가
   */
  async addAdminWorkplace(workplaces: Workplace[], id: number) {
    const hasAdmin = await this.userService.findAdminDetailById(id);
    if (!hasAdmin) return new NotFoundException('관리자가 존재하지 않습니다.');

    /**
     * 존재하는 사업장인지 확인
     * 추가
     */
    const workplaceIds = workplaces.map((w) => w.id);
    const hasWorkplaces = await this.workplaceRepository.find({
      where: {
        id: In(workplaceIds),
      },
    });

    const addWorkplace = await this.workplaceAdminRepository.insert(
      hasWorkplaces.map((w) => ({
        workplace: w,
        user: hasAdmin,
      })),
    );

    return addWorkplace;
  }

  /**
   * 관리자 담당 사업장 삭제
   */
  async deleteAdminWorkplace(id: number, delWorkplaces: Workplace[]) {
    const hasAdmin = await this.userService.findAdminDetailById(id);
    if (!hasAdmin) return new NotFoundException('관리자가 존재하지 않습니다.');

    const delWorkplaceIds = delWorkplaces.map((w) => w.id);

    const deleteWorkplaces = await this.workplaceAdminRepository.delete({
      id: In(delWorkplaceIds),
    });

    return deleteWorkplaces;
  }

  /**
   * 관리자 사업장 조회
   */
  async findOneAdminWorkplaceByIds(userId: number, workplaceid: number) {
    const hasWorkplace = await this.workplaceAdminRepository.findOne({
      relations: {
        user: true,
        workplace: true,
      },
      where: {
        workplace: { id: workplaceid },
        user: { id: userId },
      },
    });

    return hasWorkplace;
  }
}
