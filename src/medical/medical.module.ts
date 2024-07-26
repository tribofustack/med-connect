import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';
import { MedicalRecords } from './medical-records.entity';
import { User } from 'src/user/user.entity';
import { Doctor } from 'src/user/doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecords, User, Doctor])],
  providers: [MedicalService],
  controllers: [MedicalController],
})
export class MedicalModule {}
