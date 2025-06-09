import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateVoc {
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
    name: 'status',
    description: '민원상태',
    example: '진행중',
  })
  @Column()
  status: string;

  @ApiProperty({
    name: 'building',
    description: '건물명',
    example: '본관',
  })
  @Column()
  building: string;
}
