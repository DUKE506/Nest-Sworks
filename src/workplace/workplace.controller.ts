import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { Workplace } from './entities/workplace.entity';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { InsertResult } from 'typeorm';

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
}
