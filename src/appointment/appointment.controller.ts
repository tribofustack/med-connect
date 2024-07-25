import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  createAppointment(@Body() data: any) {
    return this.appointmentService.createAppointment(data);
  }

  @Get()
  getAppointments() {
    return this.appointmentService.getAppointments();
  }

  @Put(':id')
  updateAppointment(@Param('id') id: string, @Body() data: any) {
    return this.appointmentService.updateAppointment(id, data);
  }
}
