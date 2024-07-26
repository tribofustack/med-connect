import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from 'src/user/user.entity';
import { MedicalRecords } from 'src/medical/medical-records.entity';
import { env } from 'process';
import { Doctor } from 'src/user/doctor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Doctor, MedicalRecords]),
    PassportModule,
    JwtModule.register({
      secret: env.JWT_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
