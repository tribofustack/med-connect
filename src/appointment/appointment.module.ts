import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';
import { File } from 'src/medical/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, User, File])],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
