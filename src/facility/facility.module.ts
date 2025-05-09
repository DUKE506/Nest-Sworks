import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Facility } from './entities/facility.enrity';
import { FacilityController } from './facility.controller';
import { FacilityService } from './facility.service';
import { BuildingModule } from 'src/building/building.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Facility]),
    forwardRef(() => BuildingModule),
  ],
  controllers: [FacilityController],
  providers: [FacilityService],
})
export class FacilityModule {}
