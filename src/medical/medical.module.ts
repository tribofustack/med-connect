import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';
import { MedicalRecord } from 'src/medical/entities/medical-record/medical-record';
import { User } from 'src/user/entities/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, User])],
  providers: [MedicalService],
  controllers: [MedicalController],
})
export class MedicalModule {}
