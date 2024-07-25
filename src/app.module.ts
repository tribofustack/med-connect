import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalModule } from './medical/medical.module';
import { ReportModule } from './report/report.module';

import { User } from 'src/user/entities/user/user';
import { Report } from 'src/report/entities/report/report';
import { MedicalRecord } from 'src/medical/entities/medical-record/medical-record';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'db', // docker postgres service
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [
          User,
          Report,
          MedicalRecord,
        ],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    MedicalModule,
    ReportModule,
  ],
})
export class AppModule {}
