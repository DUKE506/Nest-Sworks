import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/work-perm.entity';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from './dto/create-perm';
import { WorkplaceService } from 'src/workplace/workplace.service';

@Injectable()
export class PermService {
  constructor(
    @InjectRepository(Permission)
    private permRepository: Repository<Permission>,

    @Inject(forwardRef(() => WorkplaceService))
    private workplaceService: WorkplaceService,
  ) {}

  /**
   * 사업장 별 근무자 권한 전체 조회
   * @param workplaceId
   * @returns
   */
  async findAllByWorkplace(workplaceId: number) {
    const hasWorkplace = await this.workplaceService.findOneById(workplaceId);
    if (!hasWorkplace)
      throw new NotFoundException('사업장이 존재하지 않습니다.');

    return await this.permRepository.find({
      where: { workplace: { id: hasWorkplace.id } },
    });
  }

  async findOneAdminPermByName(name: string) {
    return await this.permRepository.findOne({ where: { name: name } });
  }

  /**
   * 근무자권한 단일 조회
   * @param id
   * @returns
   */
  async findOneById(id: number) {
    return await this.permRepository.findOne({
      where: { id: id },
    });
  }

  /**
   * 사업장 별 근무자 권한 생성
   * @param workplaceId
   * @param createPermissionDto
   * @returns
   */
  async createPermission(
    workplaceId: number,
    createPermissionDto: CreatePermissionDto,
  ) {
    const hasWorkplace = await this.workplaceService.findOneById(workplaceId);
    if (!hasWorkplace)
      throw new NotFoundException('사업장이 존재하지 않습니다.');

    return await this.permRepository.insert({
      ...createPermissionDto,
      workplace: { id: hasWorkplace.id },
    });
  }

  async deletePermission(id: number) {
    const hasPerm = await this.findOneById(id);

    if (!hasPerm) throw new NotFoundException('권한이 존재하지 않습니다.');

    return await this.permRepository.delete({ id: id });
  }
}
