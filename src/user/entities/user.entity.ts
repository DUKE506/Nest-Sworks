import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Department } from 'src/department/entities/department.entity';
import { WorkplaceAdmin } from 'src/workplace/entities/workplace-admin.entity';
import { Workplace } from 'src/workplace/entities/workplace.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
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
    name: 'status',
    description: '상태',
    example: 'WORK',
  })
  @Column('varchar')
  status: 'WORK' | 'OFF' | 'RESIGN';

  @ApiProperty({
    name: 'basicPerm',
    description: '기본권한',
    example: '2',
  })
  @Column({ nullable: true })
  basicPerm: number;

  @ApiProperty({
    name: 'machinePerm',
    description: '기계설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  machinePerm: number;

  @ApiProperty({
    name: 'electricPerm',
    description: '전기설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  electricPerm: number;

  @ApiProperty({
    name: 'firePerm',
    description: '기소방설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  firePerm: number;

  @ApiProperty({
    name: 'buildingPerm',
    description: '건축설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  buildingPerm: number;

  @ApiProperty({
    name: 'networkPerm',
    description: '통신설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  networkPerm: number;

  @ApiProperty({
    name: 'beautyPerm',
    description: '미화설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  beautyPerm: number;

  @ApiProperty({
    name: 'securityPerm',
    description: '보안설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  securityPerm: number;

  @ApiProperty({
    name: 'userPerm',
    description: '사용자권한',
    example: '2',
  })
  @Column({ nullable: true })
  userPerm: number;

  @ApiProperty({
    name: 'vocPerm',
    description: '민원권한',
    example: '2',
  })
  @Column({ nullable: true })
  vocPerm: number;

  @ManyToOne(() => Department, (department) => department.users)
  department: Department;

  @OneToMany(() => WorkplaceAdmin, (workplaceAdmin) => workplaceAdmin.user)
  workplaces: WorkplaceAdmin[];

  @ManyToOne(() => Workplace, (workplace) => workplace.users)
  workplace: Workplace;
}

const UserPermission = {
  MANAGER: 'MANAGER',
  NORMAL: 'NORMAL',
  USER: 'USER',
} as const;

export type UserPermissionType =
  (typeof UserPermission)[keyof typeof UserPermission];
