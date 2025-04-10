import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({
    name: 'id',
    description: '객체 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    name: 'createdAt',
    description: '생성일시',
    example: '2025-03-06 15:32:24.839874',
  })
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: '수정일시',
    example: '2025-03-06 15:32:24.839874',
  })
  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;

  @ApiProperty({
    name: 'deletedAt',
    description: '삭제일시',
    example: '2025-03-06 15:32:24.839874',
  })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
