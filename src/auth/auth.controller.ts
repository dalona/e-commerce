import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, loginUserDto  } from './dto';
import { UsersService } from 'src/users';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}


  @Post('register')
  create(@Body()registerUserDto:RegisterUserDto){
    return this.authService.register(registerUserDto)
  }

  @Post('login')
  loginUser(@Body()loginUserDto:loginUserDto){
    return this.authService.login(loginUserDto)
  }




}
