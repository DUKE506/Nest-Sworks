import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BuildingService } from './building.service';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateBuilding } from './dto/create-buliding.dto';
import { Building } from './entities/building.entity';
import { CreateFloor } from './dto/create-floor.dto';
import { CreateRoom } from './dto/create-room.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('building')
export class BuildingController {
  constructor(private buildingService: BuildingService) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    return await this.buildingService.findAllBuilding(req.user.workplaceId);
  }

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createBuilding(@Body() building: CreateBuilding, @Req() req) {
    console.log(req.user);
    return await this.buildingService.createBuilding(
      building,
      req.user.workplaceId,
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: number): Promise<Building | null> {
    return await this.buildingService.findOneById(id);
  }

  @Get('all/name')
  @UseGuards(JwtAuthGuard)
  async findAllName(@Req() req) {
    return await this.buildingService.findAllBuildingName(req.workplaceId);
  }

  //=======층=======

  @Public()
  @Post(':id/floor/add')
  @UseGuards(JwtAuthGuard)
  async createFloor(@Body() floor: CreateFloor, @Param('id') id: number) {
    return await this.buildingService.createFloor(floor, id);
  }

  @Public()
  @Get(':id/floor/all')
  @UseGuards(JwtAuthGuard)
  async findAllFloor(@Param('id') id: number) {
    return await this.buildingService.findAllFloor(id);
  }

  //=======위치=======

  @Post(':buildingId/room/add')
  @UseGuards(JwtAuthGuard)
  async createRoom(
    @Body() createRoom: CreateRoom,
    @Param('buildingId') buildingId: number,
  ) {
    return await this.buildingService.createRoom(createRoom, buildingId);
  }

  @Get('floor/room/:workplaceid')
  @UseGuards(JwtAuthGuard)
  async(@Param('workplaceid') workplaceid: number) {
    return this.buildingService.findAllLocationTree(workplaceid);
  }
}
