import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FacilityService } from './facility.service';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateFacility } from './dto/create-facility.dto';

@Controller('facility')
export class FacilityController {
  constructor(private facilityService: FacilityService) {}

  @Public()
  @Post('create')
  async createFacility(@Body() createFacility: CreateFacility) {
    return this.facilityService.createFacility(createFacility);
  }

  @Public()
  @Get(':workplaceid/:buildingid/:category')
  async findFacility(
    @Param('workplaceid') workplaceid: string,
    @Param('buildingid') buildingid: string,
    @Param('category') category: string,
  ) {
    return await this.facilityService.findFacility(
      parseInt(workplaceid),
      parseInt(buildingid),
      category,
    );
  }
}
