import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { WorkplaceService } from './workplace.service';
import { Workplace } from './entities/workplace.entity';
import { CreateWorkplaceDto } from './dto/create-workplace.dto';
import { Admin, InsertResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/core/Guard/roles.guard';
import { Role } from 'src/core/role/role';
import { Roles } from 'src/core/decorator/roles.decorator';
import { EditPermDto } from './dto/edit-perm.dto';
import { Public } from 'src/core/decorator/public.decorator';

@Controller('workplace')
export class WorkplaceController {
  constructor(private workplaceService: WorkplaceService) {}

  @Get('/all')
  @Public()
  // @Roles(Role.MANAGER, Role.NORMAL)
  @UseGuards(RolesGuard)
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('search') search: string,
    @Query('status') status: string | string[],
  ) {
    return await this.workplaceService.findAll(page, pageSize, search, status);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.workplaceService.findDetailById(id);
  }

  @Post('create')
  async addWorkplace(
    @Body() createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<Workplace> {
    return await this.workplaceService.createWorkplace(createWorkplaceDto);
  }

  @Post(':id/add/manager')
  async addManager(@Body() admins: User[], @Param('id') id: number) {
    return await this.workplaceService.addWorkplaceAdmin(id, admins);
  }

  @Patch(':id/edit/perm')
  async editPerm(@Body() perms: EditPermDto, @Param('id') id: number) {
    return await this.workplaceService.editPerm(perms, id);
  }

  @Get(':id/not/workplace')
  findNotAddedWorkplaceById(@Param('id') id: number) {
    return this.workplaceService.findNotAddedWorkplaceById(id);
  }
}
