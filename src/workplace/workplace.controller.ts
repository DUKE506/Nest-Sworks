import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { Workplace } from './entities/workplace.entity';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { Admin, InsertResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Controller('workplace')
export class WorkplaceController {
  constructor(private workplaceService: WorkplaceService) {}

  @Get('/all')
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.workplaceService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.workplaceService.findOneById(id);
  }

  @Post('create')
  async addWorkplace(
    @Body() createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<InsertResult> {
    return await this.workplaceService.createWorkplace(createWorkplaceDto);
  }

  @Post(':id/add/manager')
  async addManager(@Body() admins: User[], @Param('id') id: number) {
    console.log(admins);

    return await this.workplaceService.addWorkplaceAdmin(id, admins);
  }
}
