import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddDeptDto } from './dto/add-dept.dto';
import { DepartmentService } from './department.service';
import { Department } from './entities/department.entity';

@Controller('department')
export class DepartmentController {
  constructor(private deptService: DepartmentService) {}

  @Post('add')
  async createDept(@Body() dept: AddDeptDto) {
    console.log(dept);

    return this.deptService.createDept(dept);
  }

  @Get('all')
  async findAll(): Promise<Department[]> {
    return await this.deptService.findAll();
  }
}
