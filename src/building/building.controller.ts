import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateBuilding } from './dto/create-buliding.dto';
import { Building } from './entities/building.entity';
import { CreateFloor } from './dto/create-floor.dto';
import { CreateRoom } from './dto/create-room.dto';

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
    return await this.buildingService.createBuilding(building);
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Building | null> {
    return await this.buildingService.findOneById(id);
  }

  //=======층=======

  @Public()
  @Post(':id/floor/add')
  async createFloor(@Body() floor: CreateFloor, @Param('id') id: number) {
    return await this.buildingService.createFloor(floor, id)
  }

  @Public()
  @Get(':id/floor/all')
  async findAllFloor(@Param('id') id: number) {
    return await this.buildingService.findAllFloor(id);
  }


  //=======위치=======

  @Public()
  @Post(':buildingid/room/:floorid/add')
  async createRoom(@Body() createRoom: CreateRoom, @Param('buildingid') buildingid: number, @Param('floorid') floorid: number) {
    return await this.buildingService.createRoom(createRoom, buildingid, floorid)
  }

}
