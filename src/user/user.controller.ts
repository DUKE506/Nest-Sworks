import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Public } from 'src/core/decorator/public.decorator';
import { DetailAdmin } from './dto/detail-admin.dto';
import { CreateUser } from './dto/create-user.dto';
import { CreateAdmin } from './dto/create-admin.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async findAll(): Promise<User[] | null> {
    return await this.userService.findAdminAll();
  }

  /**
   * 관리자 전체 조회
   */
  @Get('admin/all')
  async findAllAdmin(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('search') search: string,
    @Query('department') department: string | string[],
    @Query('permission') permission: string | string[],
  ) {
    return await this.userService.findAdminAllPagination(
      page,
      pageSize,
      search,
      department,
      permission,
    );
  }

  /**
   * 테스트용으로 account받음
   * @param account
   * @returns
   */
  @Get('account/:account')
  findOneByAccount(@Param('account') account: string): Promise<User | null> {
    console.log('파라미터 : ', account);
    return this.userService.findOneByAccount(account);
  }

  /**
   * 관리자 상세조회
   * @param id
   * @returns
   */
  @Get(':id')
  findOneById(@Param('id') id: number): Promise<DetailAdmin | null> {
    console.log('파라미터 : ', id);
    return this.userService.findAdminDetailById(id);
  }

  @Public()
  @Post('create/admin')
  async createAdmin(@Body() admin: CreateAdmin) {
    return this.userService.createAdmin(admin);
  }

  @Public()
  @Post('create/user/:placeid')
  async createUser(
    @Body() user: CreateUser,
    @Param('placeid') placeid: number,
  ) {
    return this.userService.createUser(user, placeid);
  }

  @Public()
  @Get('/all/:workplaceid')
  async findAllUser(@Param('workplaceid') workplaceid: number) {
    return this.userService.findUserAll(workplaceid);
  }
}
