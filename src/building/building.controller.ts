import { Body, Controller, Get, Post } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateBuilding } from './dto/create-buliding.dto';
import { Building } from './entities/building.entity';

@Controller('building')
export class BuildingController {
    constructor(private buildingService: BuildingService) { }

    @Public()
    @Get('all')
    async findAll(): Promise<Building[]> {
        return await this.buildingService.findAllBuilding();
    }


    @Public()
    @Post('create')
    async createBuilding(@Body() building: CreateBuilding) {
        return await this.buildingService.createBuilding(building)
    }
}
