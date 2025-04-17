import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WorkplaceAdmin } from 'src/workplace/entities/workplcae-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, WorkplaceAdmin])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
