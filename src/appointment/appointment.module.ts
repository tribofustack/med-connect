import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { User } from 'src/user/user.entity';
import { Appointment } from './appointment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
