import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Column } from 'typeorm';

export class DetailWorkplaceDto {
  @ApiProperty({
    name: 'name',
    description: '사업장명',
    example: '강남우체국',
  })
  @Column('varchar', { length: 30 })
  name: string;

  @ApiProperty({
    name: 'contractNum',
    description: '계약번호',
    example: 'CT-20240312-0010',
  })
  @Column('varchar', { length: 30 })
  contractNum: string;

  @ApiProperty({
    name: 'address',
    description: '주소',
    example: '서울특별시 강남구 개포로 619',
  })
  @Column('varchar')
  address: string;

  @ApiProperty({
    name: 'tel',
    description: '연락처',
    example: '02-154-8812',
  })
  @Column('varchar')
  tel: string;

  @ApiProperty({
    name: 'contractedAt',
    description: '계약일자',
    example: '2025-04-08',
  })
  @Column()
  contractedAt: Date;

  @ApiProperty({
    name: 'expiredAt',
    description: '해약일자',
    example: '2025-04-09',
  })
  @Column({ nullable: true })
  expiredAt: Date;

  @ApiProperty({
    name: 'permMachine',
    description: '기계권한',
    example: 'true',
  })
  @Column()
  permMachine: boolean;

  @ApiProperty({
    name: 'permElectronic',
    description: '전기권한',
    example: 'true',
  })
  @Column()
  permElectronic: boolean;

  @ApiProperty({
    name: 'permLift',
    description: '승강권한',
    example: 'true',
  })
  @Column()
  permLift: boolean;

  @ApiProperty({
    name: 'permFire',
    description: '소방권한',
    example: 'true',
  })
  @Column()
  permFire: boolean;

  @ApiProperty({
    name: 'permConstruct',
    description: '건축권한',
    example: 'true',
  })
  @Column()
  permConstruct: boolean;

  @ApiProperty({
    name: 'permNetwork',
    description: '통신권한',
    example: 'true',
  })
  @Column()
  permNetwork: boolean;

  @ApiProperty({
    name: 'permBeauty',
    description: '미화권한',
    example: 'true',
  })
  @Column()
  permBeauty: boolean;

  @ApiProperty({
    name: 'permSecurity',
    description: '보안권한',
    example: 'true',
  })
  @Column()
  permSecurity: boolean;

  @ApiProperty({
    name: 'permVoc',
    description: '민원권한',
    example: 'true',
  })
  @Column()
  permVoc: boolean;

  @ApiProperty({
    name: 'workplaceAdmins',
    description: '사업장 관리자',
  })
  @Column()
  workplaceAdmins: User[];
}
