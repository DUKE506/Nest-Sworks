import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PermService } from './perm.service';
import { CreatePermissionDto } from './dto/create-perm';

@Controller('perm')
export class PermController {
  constructor(private permService: PermService) {}

  @Get('all/:workplaceId')
  async findAllByWorkplace(@Param('workplaceId') workplaceId: number) {
    return await this.permService.findAllByWorkplace(workplaceId);
  }

  /**
   * 사업장 근무자 권한 생성
   * @param workplaceId
   * @param createPermissionDto
   * @returns
   */
  @Post('create/:workplaceId')
  async createPerm(
    @Param('workplaceId') workplaceId: number,
    @Body() createPermissionDto: CreatePermissionDto,
  ) {
    return await this.permService.createPermission(
      workplaceId,
      createPermissionDto,
    );
  }

  @Delete('delete/:id')
  async deletePerm(@Param('id') id: number) {
    return await this.permService.deletePermission(id);
  }
}
