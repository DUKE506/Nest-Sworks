import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Workplace } from 'src/workplace/entities/workplace.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

export enum PermissionEnum {
  운영관리자 = '운영관리자',
  일반관리자 = '일반관리자',
  사업소장 = '사업소장',
  근무자 = '근무자',
}

@Entity()
export class Permission extends BaseEntity {
  @ApiProperty({
    name: 'name',
    description: '권한명',
    example: '근로자 권한',
  })
  @Column('varchar')
  name: string;
  //계정 종류 / admin - Master, Normal, user - Leader, Worker
  @Column({ type: 'enum', name: 'permission', enum: PermissionEnum })
  permission: PermissionEnum;

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
    name: 'liftPerm',
    description: '승강설비 권한',
    example: '2',
  })
  @Column({ nullable: true })
  liftPerm: number;

  @ApiProperty({
    name: 'firePerm',
    description: '소방설비 권한',
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

  @ManyToOne(() => Workplace, (workplace) => workplace.perms)
  workplace: Workplace;
  @OneToMany(() => User, (user) => user.permission)
  users: User[];
}
