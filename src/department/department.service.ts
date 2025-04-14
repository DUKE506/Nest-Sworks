import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { AddDeptDto } from './dto/add-dept.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private deptRepository: Repository<Department>,
  ) {}

  async createDept(dept: AddDeptDto) {
    return await this.deptRepository.insert(dept);
  }

  async findAll(): Promise<Department[]> {
    return await this.deptRepository.find();
  }
}
