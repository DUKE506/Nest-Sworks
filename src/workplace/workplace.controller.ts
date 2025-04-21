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

@Controller('workplace')
export class WorkplaceController {
  constructor(private workplaceService: WorkplaceService) {}

  @Get('/all')
  @Roles(Role.MANAGER, Role.NORMAL)
  @UseGuards(RolesGuard)
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return await this.workplaceService.findAll(page, pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.workplaceService.findDetailById(id);
  }

  @Post('create')
  async addWorkplace(
    @Body() createWorkplaceDto: CreateWorkplaceDto,
  ): Promise<InsertResult> {
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
}
