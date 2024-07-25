import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';
import { Medical } from 'src/medical/medical.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, Medical])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
