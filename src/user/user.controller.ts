import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * 테스트용으로 account받음
   * @param account
   * @returns
   */
  @Get(':account')
  findOne(@Param('account') account: string): Promise<User | null> {
    console.log('파라미터 : ', account);
    return this.userService.findOne(account);
  }

  @Post('create/admin')
  async creatAdmin(@Body() admin: User) {
    return this.userService.createAdmin(admin);
  }
}
