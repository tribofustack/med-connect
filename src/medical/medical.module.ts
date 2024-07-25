import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';
import { MedicalRecord } from './medical-record.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalRecord, User])],
  providers: [MedicalService],
  controllers: [MedicalController],
})
export class MedicalModule {}
