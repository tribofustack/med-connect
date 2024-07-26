import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { ResponseAppointmentDto } from './dto/response-appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('doctors/:id')
  async findByDoctorId(
    @Param('id') id: number,
  ): Promise<Partial<Appointment>[]> {
    return this.appointmentService.findByDoctorId(id);
  }

  @Get('users/:id')
  async findByUserId(@Param('id') id: number): Promise<Appointment[]> {
    return this.appointmentService.findByUserId(id);
  }

  @Post('request/users/:userId')
  async request(
    @Param('userId') userId: number,
    @Body() CreateAppointment: CreateAppointmentDto,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.request(userId, CreateAppointment);
  }

  @Put(':id/response')
  async response(
    @Param('id') id: number,
    @Body() responseDto: ResponseAppointmentDto,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.response(id, responseDto.response);
  }
}
