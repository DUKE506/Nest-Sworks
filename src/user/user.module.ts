import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WorkplaceAdmin } from 'src/workplace/entities/workplace-admin.entity';
import { WorkplaceModule } from 'src/workplace/workplace.module';
import { DepartmentModule } from 'src/department/department.module';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, WorkplaceAdmin, Department]),
    forwardRef(() => WorkplaceModule),
    forwardRef(() => DepartmentModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
