import { Injectable, Body, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (user) {
      throw new BadRequestException('Requested email already exists!');
    }
    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);

    return this.userRepository.save(createUserDto);
  }

  async validateUserCredentials(@Body() loginDto: LoginDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new BadRequestException('Oops, invalid credentials!');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('The given password is incorrect!');
    }

    return user;
  }
}
