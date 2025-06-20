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

  async findOneByName(name: string) {
    return await this.deptRepository.findOne({ where: { name } });
  }

  async findOneById(id: number) {
    return await this.deptRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Department[]> {
    return await this.deptRepository.find();
  }
}
