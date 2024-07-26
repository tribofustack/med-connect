import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { MedicalRecords } from 'src/medical/medical-records.entity';
import { Doctor } from './doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, MedicalRecords, Doctor, Appointment]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
