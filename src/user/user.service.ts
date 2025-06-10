import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailAdmin } from './dto/detail-admin.dto';
import { CreateUser } from './dto/create-user.dto';
import { WorkplaceService } from 'src/workplace/workplace.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => WorkplaceService))
    private workplaceService: WorkplaceService,
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

  async findAdminAll() {
    return await this.userRepository.find({
      where: [{ permission: 'MANAGER' }, { permission: 'NORMAL' }],
      relations: { department: true },
    });
  }

  /**
   * 관리자 생성
   * @param admin
   * @returns
   */
  async createAdmin(admin: User) {
    return await this.userRepository.insert({ ...admin, status: 'WORK' });
  }

  async findOneByAccount(account: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        account,
      },
      relations: { department: true, workplace: true },
    });
  }

  /**
   * 상세조회회
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
      relations: ['department', 'workplaces.workplace'],
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
      permission: 'USER',
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
