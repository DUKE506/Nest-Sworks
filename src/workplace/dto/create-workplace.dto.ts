import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateWorkplaceDto {
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
}
