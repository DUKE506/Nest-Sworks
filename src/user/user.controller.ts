import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Public } from 'src/core/decorator/public.decorator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async findAll(): Promise<User[] | null> {
    return await this.userService.findAll();
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
   * 테스트용으로 account받음
   * @param id
   * @returns
   */
  @Get('id/:id')
  findOneById(@Param('id') id: number): Promise<User | null> {
    console.log('파라미터 : ', id);
    return this.userService.findOneById(id);
  }

  @Public()
  @Post('create/admin')
  async creatAdmin(@Body() admin: User) {
    return this.userService.createAdmin(admin);
  }
}
