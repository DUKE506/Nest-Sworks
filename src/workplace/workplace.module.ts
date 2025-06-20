import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entity';
import { WorkplaceController } from './workplace.controller';
import { WorkplaceService } from './workplace.service';
import { WorkplaceAdmin } from './entities/workplace-admin.entity';
import { UserModule } from 'src/user/user.module';
import { PermModule } from 'src/perm/perm.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Workplace, WorkplaceAdmin]),
    forwardRef(() => UserModule),
    forwardRef(() => PermModule),
  ],
  controllers: [WorkplaceController],
  providers: [WorkplaceService],
  exports: [WorkplaceService],
})
export class WorkplaceModule {}
