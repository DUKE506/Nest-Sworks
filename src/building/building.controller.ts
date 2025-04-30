import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BuildingService } from './building.service';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateBuilding } from './dto/create-buliding.dto';
import { Building } from './entities/building.entity';
import { CreateFloor } from './dto/create-floor.dto';
import { CreateRoom } from './dto/create-room.dto';

@Controller('building')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Public()
  @Get('all/:workplaceid')
  async findAll(
    @Param('workplaceid') workplaceid: number,
  ): Promise<Building[]> {
    return await this.buildingService.findAllBuilding(workplaceid);
  }

  @Public()
  @Post('create/:workplaceid')
  async createBuilding(
    @Body() building: CreateBuilding,
    @Param('workplaceid') workplaceid: number,
  ) {
    return await this.buildingService.createBuilding(building, workplaceid);
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
    return await this.buildingService.createFloor(floor, id);
  }

  @Public()
  @Get(':id/floor/all')
  async findAllFloor(@Param('id') id: number) {
    return await this.buildingService.findAllFloor(id);
  }

  //=======위치=======

  @Public()
  @Post(':buildingid/room/:floorid/add')
  async createRoom(
    @Body() createRoom: CreateRoom,
    @Param('buildingid') buildingid: number,
    @Param('floorid') floorid: number,
  ) {
    return await this.buildingService.createRoom(
      createRoom,
      buildingid,
      floorid,
    );
  }

  @Public()
  @Get('floor/room/:workplaceid')
  async(@Param('workplaceid') workplaceid: number) {
    return this.buildingService.findAllLocationTree(workplaceid);
  }
}
