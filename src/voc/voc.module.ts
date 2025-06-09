import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voc } from './entities/voc.entity';
import { BuildingModule } from 'src/building/building.module';
import { VocController } from './voc.controller';
import { VocService } from './voc.service';
import { WorkplaceModule } from 'src/workplace/workplace.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Voc]),
    forwardRef(() => BuildingModule),
    forwardRef(() => WorkplaceModule),
  ],
  controllers: [VocController],
  providers: [VocService],
  exports: [VocService],
})
export class VocModule {}
