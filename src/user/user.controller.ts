import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './user.entity';
import { CreateBusinessHourDTO } from './dto/create-business-hour.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Put(':id')
  changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @Get('pacient/')
  findPacients(): Promise<User[]> {
    return this.userService.findPacients();
  }

  @Get('pacient/:id')
  findPacient(@Param('id') id: number): Promise<User> {
    return this.userService.findPacient(id);
  }

  @Get('doctors')
  findDoctors(): Promise<User[]> {
    return this.userService.findDoctors();
  }

  @Get('doctor/:id')
  findDoctor(@Param('id') id: number): Promise<User> {
    return this.userService.findDoctor(id);
  }

  @Get('doctor/:id/schedule')
  findDoctorSchedule(@Param('id') id: number): Promise<any> {
    return this.userService.findDoctorSchedule(id);
  }

  @Put('doctor/:id/rate')
  rateDoctor(
    @Param('id') id: number,
    @Body('rating') rating: number,
  ): Promise<User> {
    return this.userService.rateDoctor(id, rating);
  }

  @Post('doctor/:id/businesshour')
  createBusinessHour(
    @Param('id') id: number,
    @Body() createBusinessHourDTO: CreateBusinessHourDTO
  ): Promise<User> {
    return this.userService.createBusinessHour(id, createBusinessHourDTO);
  }
}
