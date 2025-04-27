import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { BuildingController } from './building.controller';
import { BuildingService } from './building.service';
import { Floor } from './entities/floor.entity';
import { Room } from './entities/room.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Building, Floor, Room])],
    controllers: [BuildingController],
    providers: [BuildingService]
})
export class BuildingModule { }
