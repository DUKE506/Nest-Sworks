import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VocService } from './voc.service';
import { Public } from 'src/core/decorator/public.decorator';
import { CreateVoc } from './dto/create-voc.dto';

@Controller('voc')
export class VocController {
  constructor(private vocService: VocService) {}

  @Public()
  @Post('create/handwrite')
  async CreateVoc(@Body() createVoc: CreateVoc) {
    return await this.vocService.createVocHandWrite(createVoc);
  }

  @Public()
  @Get('all/:workplaceid')
  async FindAllVoc(
    @Param('workplaceid') workplaceid: number,
    @Query('channel') channel?: string | string[],
    @Query('location') location?: string | string[],
    @Query('type') type?: string | string[],
    @Query('status') status?: string | string[],
  ) {
    const channels = Array.isArray(channel)
      ? channel
      : channel
        ? [channel]
        : [];
    const locations = Array.isArray(location)
      ? location
      : location
        ? [location]
        : [];
    const types = Array.isArray(type) ? type : type ? [type] : [];
    const statuses = Array.isArray(status) ? status : status ? [status] : [];

    return await this.vocService.findAllVoc(
      workplaceid,
      channels,
      locations,
      types,
      statuses,
    );
  }
}
