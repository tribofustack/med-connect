import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';
import { Medical } from './medical.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medical])],
  providers: [MedicalService],
  controllers: [MedicalController],
})
export class MedicalModule {}
