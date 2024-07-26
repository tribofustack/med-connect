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

  @Put(':type/:id/')
  changePassword(
    @Param('id') id: number,
    @Param('type') type: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.userService.changePassword(id, type, changePasswordDto);
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

  @Get('doctors/:id')
  findDoctor(@Param('id') id: number): Promise<User> {
    return this.userService.findDoctor(id);
  }

  @Get('doctors/:doctorId/schedule')
  findDoctorSchedule(@Param('doctorId') doctorId: number): Promise<any> {
    return this.userService.findDoctorSchedule(doctorId);
  }

  @Put('doctors/:doctorId/rate')
  rateDoctor(
    @Param('doctorId') doctorId: number,
    @Body('rating') rating: number,
  ): Promise<User> {
    return this.userService.rateDoctor(doctorId, rating);
  }
}
