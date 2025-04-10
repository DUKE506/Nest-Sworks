import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/core/entity/base.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Department extends BaseEntity {
  @ApiProperty({
    name: 'name',
    description: '부서명',
    example: '시스템개발연구소',
  })
  @Column('varchar', { length: 20 })
  name: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
