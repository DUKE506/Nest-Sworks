import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Building } from './entities/building.entity';
import { CreateBuilding } from './dto/create-buliding.dto';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building)
    private buildingRepository: Repository<Building>,
  ) {}

  async findAllBuilding() {
    return await this.buildingRepository.find({});
  }

  async createBuilding(building: CreateBuilding) {
    return await this.buildingRepository.insert(building);
  }

  async findOneById(id: number) {
    return await this.buildingRepository.findOne({ where: { id } });
  }
}
