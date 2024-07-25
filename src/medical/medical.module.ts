import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalService } from './medical.service';
import { MedicalController } from './medical.controller';
import { Medical } from './medical.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medical, User])],
  providers: [MedicalService],
  controllers: [MedicalController],
})
export class MedicalModule {}
