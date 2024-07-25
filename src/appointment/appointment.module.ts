import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from 'src/appointment/entities/appointment/appointment';
import { User } from 'src/user/entities/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
