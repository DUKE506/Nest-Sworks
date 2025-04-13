import { Body, Controller, Post } from '@nestjs/common';
import { AddDeptDto } from './dto/add-dept.dto';
import { DepartmentService } from './department.service';

@Controller('department')
export class DepartmentController {
  constructor(private deptSerivce: DepartmentService) {}

  @Post('add')
  async createDept(@Body() dept: AddDeptDto) {
    console.log(dept);

    return this.deptSerivce.createDept(dept);
  }
}
