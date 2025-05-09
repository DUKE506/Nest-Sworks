import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Floor } from './entities/floor.entity';
import { Room } from './entities/room.entity';
import { FacilityModule } from 'src/facility/facility.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Building, Floor, Room]),
    forwardRef(() => FacilityModule),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
