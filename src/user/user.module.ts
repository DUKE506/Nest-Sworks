import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { WorkplaceAdmin } from 'src/workplace/entities/workplace-admin.entity';
import { WorkplaceModule } from 'src/workplace/workplace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, WorkplaceAdmin]),
    forwardRef(() => WorkplaceModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
