import { ApiProperty } from '@nestjs/swagger';
import { Building } from 'src/building/entities/building.entity';
import { BaseEntity } from 'src/core/entity/base.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Voc extends BaseEntity {
  @ApiProperty({
    name: 'title',
    description: '제목',
    example: '민원 제목',
  })
  @Column()
  title: string;

  @ApiProperty({
    name: 'content',
    description: '내용',
    example: '민원 내용',
  })
  @Column()
  content: string;

  @ApiProperty({
    name: 'complainant',
    description: '민원인',
    example: '홍길동',
  })
  @Column()
  complainant: string;

  @ApiProperty({
    name: 'phone',
    description: '전화번호',
    example: '01012345678',
  })
  @Column()
  phone: string;

  @ApiProperty({
    name: 'type',
    description: '민원유형',
    example: '전기',
  })
  @Column()
  type: string;

  @ApiProperty({
    name: 'channel',
    description: '민원구분',
    example: '모바일',
  })
  @Column()
  channel: string;

  @ApiProperty({
    name: 'status',
    description: '민원상태',
    example: '진행중',
  })
  @Column()
  status: string;

  @ManyToOne(() => Building, (building) => building.vocs)
  building: Building;
}
