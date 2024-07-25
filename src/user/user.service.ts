import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Medical } from 'src/medical/medical.entity';
import { Appointment } from 'src/appointment/appointment.entity';
import { Report } from 'src/report/report.entity';
import { CreateAppointmentDto } from 'src/appointment/dto/create-appointment.dto';
import { UpdateAppointmentDto } from 'src/appointment/dto/update-appointment.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(Medical)
    private medicalRepository: Repository<Medical>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save(user);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.findOne(id);
    const passwordMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Current password is incorrect');
    }
    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.userRepository.save(user);
  }

  async createRecord(
    userId: number,
    createRecordDto: CreateRecordDto,
  ): Promise<Report> {
    const user = await this.findOne(userId);
    const report = this.reportRepository.create({
      ...createRecordDto,
      patient: user,
    });
    return this.reportRepository.save(report);
  }

  async readRecord(recordId: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id: recordId },
    });
    if (!report) {
      throw new NotFoundException('Record not found');
    }
    return report;
  }

  async updateRecord(
    recordId: number,
    updateRecordDto: UpdateRecordDto,
  ): Promise<Report> {
    const report = await this.reportRepository.preload({
      id: recordId,
      ...updateRecordDto,
    });
    if (!report) {
      throw new NotFoundException('Record not found');
    }
    return this.reportRepository.save(report);
  }

  async uploadDocument(recordId: number, file: any): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id: recordId },
    });
    if (!report) {
      throw new NotFoundException('Record not found');
    }
    report.metadata = { ...report.metadata, ...file };
    return this.reportRepository.save(report);
  }

  async deleteRecord(recordId: number): Promise<void> {
    const result = await this.reportRepository.delete(recordId);
    if (result.affected === 0) {
      throw new NotFoundException('Record not found');
    }
  }

  async manageRecordPermissions(
    recordId: number,
    roles: string[],
  ): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id: recordId },
    });
    if (!report) {
      throw new NotFoundException('Record not found');
    }
    report.roles = roles;
    return this.reportRepository.save(report);
  }

  async createAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const doctor = await this.medicalRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
    });
    const patient = await this.userRepository.findOne({
      where: { id: createAppointmentDto.patientId },
    });

    if (!doctor || !patient) {
      throw new NotFoundException('Doctor or Patient not found');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto,
      doctor,
      patient,
    });

    return this.appointmentRepository.save(appointment);
  }

  async findAppointments(userId: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: [{ doctor: { id: userId } }, { patient: { id: userId } }],
      relations: ['doctor', 'patient'],
    });
  }

  async cancelAppointment(appointmentId: number): Promise<void> {
    const result = await this.appointmentRepository.delete(appointmentId);
    if (result.affected === 0) {
      throw new NotFoundException('Appointment not found');
    }
  }

  async updateAppointment(
    appointmentId: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.preload({
      id: appointmentId,
      ...updateAppointmentDto,
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return this.appointmentRepository.save(appointment);
  }

  async findDoctors(): Promise<Medical[]> {
    return this.medicalRepository.find();
  }

  async findDoctorSchedule(doctorId: number): Promise<any> {
    const doctor = await this.medicalRepository.findOne({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor.business_hours;
  }

  async rateDoctor(doctorId: number, rating: number): Promise<Medical> {
    const doctor = await this.medicalRepository.findOne({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    doctor.rating = rating;
    return this.medicalRepository.save(doctor);
  }
}
