import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './appointment.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment | void> {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  findAll(): Promise<Appointment[] | void> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Appointment | void> {
    return this.appointmentService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment | void> {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void | void> {
    return this.appointmentService.remove(id);
  }

  @Get('findByPacient/:id')
  findByPacientId(@Param('id') id: number): Promise<Appointment | void> {
    return this.appointmentService.findByPacientId(id);
  }

  @Get('findByDoctor/:id')
  findByDoctorId(@Param('id') id: number): Promise<Appointment | void> {
    return this.appointmentService.findByDoctorId(id);
  }

  @Post('request')
  requestAppointment(
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment | void> {
    return this.appointmentService.requestAppointment(createAppointmentDto);
  }

  @Post('response/:id/:status')
  responseAppointment(
    @Param('id') id: number,
    @Param('status') status: string,
  ): Promise<Appointment | void> {
    return this.appointmentService.responseAppointment(id, status);
  }
}
