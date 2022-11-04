import { Controller, Get, Post, Request, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { Public } from './public.local';
import { UserDTO } from './user/dto/user.dto';
import { UsersService } from './user/users.service';
// import { HttpCode } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private readonly usersService: UsersService
    ) {}
  
  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Public()
  @Post('auth/register')
  registerUsers(@Body() body: UserDTO) {
    console.log('<- POST Body: ', body);
    return this.usersService.register(body);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get()
  // @HttpCode(404)
  // lost(): string {
  //   return 'Seems you are lost';
  // }
}
