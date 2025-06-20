import { forwardRef, Module } from '@nestjs/common';
import { PermController } from './perm.controller';
import { PermService } from './perm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './entities/work-perm.entity';
import { WorkplaceModule } from 'src/workplace/workplace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => WorkplaceModule),
  ],
  controllers: [PermController],
  providers: [PermService],
  exports: [PermService],
})
export class PermModule {}
