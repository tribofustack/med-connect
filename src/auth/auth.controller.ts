import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DoctorLoginDto, UserLoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateDoctorDto } from 'src/user/dto/create-doctor.dto';
import { Doctor } from 'src/user/doctor.entity';
import { User } from 'src/user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('health')
  async checkHealth() {
    return { status: 'ok', success: true };
  }

  @Post('users/login')
  async userLogin(@Body() loginDto: UserLoginDto) {
    return this.authService.loginUser(loginDto);
  }

  @Post('doctors/login')
  async doctorLogin(@Body() loginDto: DoctorLoginDto) {
    return this.authService.loginDoctor(loginDto);
  }

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Post('doctors')
  async createDoctor(
    @Body() createDoctorDto: CreateDoctorDto,
  ): Promise<Doctor> {
    return this.userService.createDoctor(createDoctorDto);
  }
}
