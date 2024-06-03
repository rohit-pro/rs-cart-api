import { Controller, Get, Request, Post, UseGuards, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, AuthService, JwtAuthGuard, BasicAuthGuard } from './auth';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {

  constructor(private authService: AuthService) {}

  @Get([ '', 'ping' ])
  healthCheck(): any {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  
  @ApiTags('Auth')
  @UseGuards(LocalAuthGuard)
  @Post('api/auth/login')
  async login(@Request() req) {
    const token = this.authService.login(req.user, 'basic');

    return  {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        ...token,
      },
    };
  }

  @ApiTags('Profile')
  @UseGuards(BasicAuthGuard)
  @Get('api/profile')
  async getProfile(@Request() req) {
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        user: req.user,
      },
    };
  }
}
