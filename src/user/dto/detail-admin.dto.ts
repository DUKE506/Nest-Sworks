import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Department } from 'src/department/entities/department.entity';
import { Workplace } from 'src/workplace/entities/workplace.entity';
import { Column } from 'typeorm';
import { UserPermissionType } from '../entities/user.entity';

export class DetailAdmin extends BaseEntity {
  /**
   * 이름
   * 아이디
   * 패스워드
   *
   * 전화번호
   * 이메일
   * 권한 - PERMISSION
   *
   * 부서
   * 사업장 - PERMISSION [ USER ]
   */

  @ApiProperty({
    name: 'name',
    description: '사용자명',
    example: '홍길동',
  })
  @Column('varchar', { length: 20 })
  name: string;

  @ApiProperty({
    name: 'account',
    description: '아이디',
    example: 'account123',
  })
  @Column('varchar', { length: 20 })
  account: string;

  @ApiProperty({
    name: 'password',
    description: '비밀번호',
    example: 'password123',
  })
  @Column('varchar', { length: 20 })
  password: string;

  @ApiProperty({
    name: 'phone',
    description: '전화번호',
    example: '010-1234-5670',
  })
  @Column('varchar', { length: 20 })
  phone: string;

  @ApiProperty({
    name: 'email',
    description: '이메일',
    example: 'sworks@s-works.co.kr',
  })
  @Column('varchar', { length: 50 })
  email: string;

  @ApiProperty({
    name: 'permission',
    description: '권한',
    example: 'MANAGER',
  })
  @Column('varchar')
  permission: UserPermissionType;

  @ApiProperty({
    name: 'department',
    description: '부서',
    example: '시스템개발연구소',
  })
  department: Department;

  @ApiProperty({
    name: 'workplace',
    description: '담당 사업장',
  })
  workplaces: Workplace[];
}
