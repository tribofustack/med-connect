import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './appointment.entity';
import { ResponseAppointmentDto } from './dto/response-appointment.dto';

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

  @Put(':id/request/users/:userId')
  async request(
    @Param('id') id: number,
    @Param('userId') userId: number,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.request(id, userId);
  }

  @Put(':id/response')
  async response(
    @Param('id') id: number,
    @Body() responseDto: ResponseAppointmentDto,
  ): Promise<Partial<Appointment>> {
    return this.appointmentService.response(id, responseDto.response);
  }
}
