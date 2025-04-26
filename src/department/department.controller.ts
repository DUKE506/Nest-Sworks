import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddDeptDto } from './dto/add-dept.dto';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';
import { Public } from 'src/core/decorator/public.decorator';

@Controller('department')
export class DepartmentController {
  constructor(private deptService: DepartmentService) { }

  @Public()
  @Post('add')
  async createDept(@Body() dept: AddDeptDto) {

    return this.deptService.createDept(dept);
  }

  @Public()
  @Get('all')
  async findAll(): Promise<Department[]> {
    return await this.deptService.findAll();
  }
}
