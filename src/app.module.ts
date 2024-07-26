import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalModule } from './medical/medical.module';
import { User } from './user/user.entity';
import { File } from './medical/file.entity';

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
        entities: [User, File],
        synchronize: true, // Set to false in production
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    AppointmentModule,
    MedicalModule,
  ],
})
export class AppModule {}
