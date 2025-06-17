import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Body,
  HttpCode,
  Param,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';

import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './core/decorator/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('auth/select/workplace')
  @UseGuards(JwtAuthGuard)
  async selectWorkplace(@Req() req, @Body() body: { workplaceId: number }) {
    return this.authService.selectWorkplace(req.user, body.workplaceId);
  }
}
