import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Not, Repository } from 'typeorm';
import { DetailAdmin } from './dto/detail-admin.dto';
import { CreateUser } from './dto/create-user.dto';
import { WorkplaceService } from 'src/workplace/workplace.service';
import { ListModel } from 'src/core/dto/list-type.dto';
import { CreateAdmin } from './dto/create-admin.dto';
import { Department } from 'src/department/entities/department.entity';
import { DepartmentService } from 'src/department/department.service';
import { PermissionEnum } from 'src/perm/entities/work-perm.entity';
import { PermService } from 'src/perm/perm.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => WorkplaceService))
    private workplaceService: WorkplaceService,

    @Inject(forwardRef(() => DepartmentService))
    private departmentService: DepartmentService,

    @Inject(forwardRef(() => PermService))
    private permService: PermService,
  ) {}

  private readonly user: User;

  /**
   * 사용자ID 중복검사
   * --
   * @param account
   */
  async duplicatedUser(account: string) {
    const res = await this.userRepository.findOne({
      where: {
        account,
      },
    });
  }

  /**
   * 관리자 전체조회
   * @returns
   */
  async findAdminAll() {
    return await this.userRepository.find({
      where: [
        {
          permission: [
            { permission: PermissionEnum.운영관리자 },
            { permission: PermissionEnum.일반관리자 },
          ],
        },
      ],
      relations: { department: true, permission: true },
    });
  }

  /**
   * 관리자 전체 조회 페이지네이션
   */
  async findAdminAllPagination(
    page: number,
    pageSize: number,
    search?: string,
    department?: string | string[],
    permission?: string | string[],
  ) {
    // console.log('=====================');
    // console.log('page : ', page);
    // console.log('pageSize : ', pageSize);
    // console.log('search : ', search);
    // console.log('department : ', department);
    // console.log('permission : ', permission);
    try {
      const whereCondition: any = {};
      //검색어
      whereCondition.name = Like(`%${search}%`);
      //권한
      if (permission === undefined) {
        whereCondition.permission = In([]);
      } else {
        whereCondition.permission = Array.isArray(permission)
          ? { permission: In(permission) }
          : { permission: permission };
      }

      //부서
      if (department === undefined) {
        whereCondition.department = In([]);
      } else {
        whereCondition.department = Array.isArray(department)
          ? { name: In(department) }
          : { name: department };
      }

      const [items, totalCount] = await this.userRepository.findAndCount({
        skip: (page - 1) * pageSize,
        take: pageSize,
        relations: { department: true, permission: true },
        where: whereCondition,
      });

      const data: ListModel<User> = {
        meta: {
          totalCount,
          pageSize,
          page,
        },
        data: items,
      };

      return data;
    } catch (err) {
      console.error(err.code);
      return;
    }
  }

  /**
   * 관리자 생성
   * @param admin
   * @returns
   */
  async createAdmin(admin: CreateAdmin) {
    const hasDept = await this.departmentService.findOneById(admin.department);

    if (!hasDept) return new NotFoundException('부서가 존재하지 않습니다.');
    const { permission, ...rest } = admin;

    if (!permission)
      throw new NotFoundException('관리자 권한이 존재하지않습니다.');

    var permName;

    if (admin.permission === '운영관리자') {
      permName = '운영관리자 권한';
    }

    if (admin.permission === '일반관리자') {
      permName = '일반관리자 권한';
    }
    const hasPerm = await this.permService.findOneAdminPermByName(permName);

    if (!hasPerm)
      throw new NotFoundException('관리자 권한이 존재하지않습니다.');

    return await this.userRepository.insert({
      ...rest,
      department: hasDept,
      status: 'WORK',
      permission: { id: hasPerm.id },
    });
  }

  async findOneByAccount(account: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        account,
      },
      relations: { department: true, workplace: true, permission: true },
    });
  }

  /**
   * 상세조회
   * @param id
   * @returns
   */
  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: { department: true },
    });
  }

  /**
   * 관리자 상세조회
   * @param id
   * @returns
   */
  async findAdminDetailById(id: number): Promise<DetailAdmin | null> {
    const res = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['department', 'workplaces.workplace', 'permission'],
    });

    if (!res) {
      return null;
    }

    const { workplaces, ...rest } = res;

    const filterWorkplace = workplaces.map(
      ({ workplace, ...rest }) => workplace,
    );

    const detailAdmin: DetailAdmin = {
      ...rest,
      workplaces: filterWorkplace,
    };

    return detailAdmin;
  }

  /**
   * 일반 사용자 생성
   * @param user
   */
  async createUser(user: CreateUser, placeid: number) {
    const workplace = await this.workplaceService.findOneById(placeid);
    if (!workplace) {
      return new NotFoundException('사업장이 존재하지않습니다.');
    }

    return await this.userRepository.insert({
      ...user,
      status: 'WORK',
      workplace: { id: workplace.id },
    });
  }

  async findUserAll(placeid: number) {
    const workplace = await this.workplaceService.findOneById(placeid);
    if (!workplace) return new NotFoundException('사업장이 존재하지 않습니다.');

    return await this.userRepository.find({
      where: { workplace: { id: placeid } },
    });
  }
}
