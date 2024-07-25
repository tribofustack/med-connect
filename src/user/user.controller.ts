import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CreateAppointmentDto } from 'src/appointment/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/appointment/dto/update-appointment.dto';
import { User } from './user.entity';
import { Report } from 'src/report/report.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Medical } from 'src/medical/medical.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Put(':id/password')
  changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.userService.changePassword(id, changePasswordDto);
  }

  @Post(':id/records')
  createRecord(
    @Param('id') id: number,
    @Body() createRecordDto: CreateRecordDto,
  ): Promise<Report> {
    return this.userService.createRecord(id, createRecordDto);
  }

  @Put(':userId/records/:recordId')
  updateRecord(
    @Param('userId') userId: number,
    @Param('recordId') recordId: number,
    @Body() updateRecordDto: UpdateRecordDto,
  ): Promise<Report> {
    return this.userService.updateRecord(recordId, updateRecordDto);
  }

  @Post(':userId/records/:recordId/upload')
  uploadDocument(
    @Param('userId') userId: number,
    @Param('recordId') recordId: number,
    @Body() file: any,
  ): Promise<Report> {
    return this.userService.uploadDocument(recordId, file);
  }

  @Get(':userId/records/:recordId')
  readRecord(
    @Param('userId') userId: number,
    @Param('recordId') recordId: number,
  ): Promise<Report> {
    return this.userService.readRecord(recordId);
  }

  @Delete(':userId/records/:recordId')
  deleteRecord(
    @Param('userId') userId: number,
    @Param('recordId') recordId: number,
  ): Promise<void> {
    return this.userService.deleteRecord(recordId);
  }

  @Put(':userId/records/:recordId/permissions')
  manageRecordPermissions(
    @Param('userId') userId: number,
    @Param('recordId') recordId: number,
    @Body() roles: string[],
  ): Promise<Report> {
    return this.userService.manageRecordPermissions(recordId, roles);
  }

  @Post(':id/appointments')
  createAppointment(
    @Param('id') id: number,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.userService.createAppointment(createAppointmentDto);
  }

  @Get(':id/appointments')
  findAppointments(@Param('id') id: number): Promise<Appointment[]> {
    return this.userService.findAppointments(id);
  }

  @Put(':userId/appointments/:appointmentId')
  updateAppointment(
    @Param('userId') userId: number,
    @Param('appointmentId') appointmentId: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    return this.userService.updateAppointment(
      appointmentId,
      updateAppointmentDto,
    );
  }

  @Delete(':userId/appointments/:appointmentId')
  cancelAppointment(
    @Param('userId') userId: number,
    @Param('appointmentId') appointmentId: number,
  ): Promise<void> {
    return this.userService.cancelAppointment(appointmentId);
  }

  @Get('doctors')
  findDoctors(): Promise<Medical[]> {
    return this.userService.findDoctors();
  }

  @Get('doctors/:doctorId/schedule')
  findDoctorSchedule(@Param('doctorId') doctorId: number): Promise<any> {
    return this.userService.findDoctorSchedule(doctorId);
  }

  @Put('doctors/:doctorId/rate')
  rateDoctor(
    @Param('doctorId') doctorId: number,
    @Body('rating') rating: number,
  ): Promise<Medical> {
    return this.userService.rateDoctor(doctorId, rating);
  }
}
