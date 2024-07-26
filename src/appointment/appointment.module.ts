import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';
import { Doctor } from 'src/user/doctor.entity';
import { MedicalRecords } from 'src/medical/medical-records.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, User, Doctor, MedicalRecords]),
  ],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
