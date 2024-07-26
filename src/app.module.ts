import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalModule } from './medical/medical.module';
import { User } from './user/user.entity';
import { Appointment } from './appointment/appointment.entity';
import { File } from './medical/file.entity';

const entities = [User, Appointment, File];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities,
        synchronize: configService.get<boolean>('DB_SYNC'),
      }),
    }),
    TypeOrmModule.forFeature(entities),
    AuthModule,
    UserModule,
    AppointmentModule,
    MedicalModule,
  ],
})
export class AppModule {}
