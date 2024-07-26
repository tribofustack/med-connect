import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { RegisterBusinessHoursDto } from './dto/register-business-hours.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get('doctors')
  async findDoctors(): Promise<Partial<Doctor>[]> {
    return this.userService.findDoctors();
  }

  @Put('doctors/:id/register')
  async register(
    @Param('id') id: number,
    @Body() registerBusinessHours: RegisterBusinessHoursDto,
  ): Promise<any> {
    return this.userService.register(id, registerBusinessHours);
  }
}
