import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CreateMeetDto } from './dto/create-meet.dto';
import { User } from 'src/user/user.entity';
import { File } from 'src/medical/file.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(File)
    private medicalRepository: Repository<File>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const doctor = await this.userRepository.findOne({
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

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: ['doctor', 'patient'],
    });
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['doctor', 'patient'],
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async update(
    id: number,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    const appointment = await this.appointmentRepository.preload({
      id,
      ...updateAppointmentDto,
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Appointment not found');
    }
  }

  async createMeet(
    id: number,
    createMeetDto: CreateMeetDto,
  ): Promise<Appointment> {
    const appointment = await this.findOne(id);
    appointment.meet = createMeetDto;
    return this.appointmentRepository.save(appointment);
  }
}
