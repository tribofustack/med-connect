import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalModule } from './medical/medical.module';
import { User } from './user/user.entity';
import { Doctor } from './user/doctor.entity';
import { BusinessHour } from './user/businessHour.entity';
import { Appointment } from './appointment/appointment.entity';
import { MedicalRecords } from './medical/medical-records.entity';
import { Auth } from './auth/auth.entity';

const entities = [User, Doctor, Auth, Appointment, MedicalRecords, BusinessHour];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConnection = {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities,
          synchronize: configService.get<boolean>('DB_SYNC'),
        } as TypeOrmModuleAsyncOptions;
        console.log('\n', dbConnection, '\n');
        return dbConnection;
      },
    }),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    UserModule,
    AppointmentModule,
    MedicalModule,
  ],
})
export class AppModule {}
