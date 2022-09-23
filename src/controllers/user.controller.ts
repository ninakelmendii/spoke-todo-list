import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../dtos/createUser.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserService } from '../services/user.service';
import * as jwt from 'jsonwebtoken';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  public async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  @Post('/login')
  public async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.validateUserCredentials(loginDto);

    return {
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET),
    };
  }
}
