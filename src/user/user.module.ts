import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Medical } from 'src/medical/medical.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, Appointment, Medical])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
