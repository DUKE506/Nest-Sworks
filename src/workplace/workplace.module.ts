import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workplace } from './entities/workplace.entity';
import { WorkplaceController } from './workplace.controller';
import { WorkplaceService } from './workplace.service';
import { WorkplaceAdmin } from './entities/workplcae-admin.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Workplace, WorkplaceAdmin]), UserModule],
  controllers: [WorkplaceController],
  providers: [WorkplaceService],
  exports: [WorkplaceService],
})
export class WorkplaceModule {}
