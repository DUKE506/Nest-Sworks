import { Entity, ManyToOne } from 'typeorm';
import { Workplace } from './workplace.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseEntity } from 'src/core/entity/base.entity';

@Entity()
export class WorkplaceAdmin extends BaseEntity {
  @ManyToOne(() => Workplace, (workplace) => workplace.workplaceAdmins)
  workplace: Workplace;

  @ManyToOne(() => User, (user) => user.workplaceAdmins)
  user: User;
}
