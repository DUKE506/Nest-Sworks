import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  HttpCode,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/core/decorator/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
