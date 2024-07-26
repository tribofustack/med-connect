import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { CreateMeetDto } from './dto/create-meet.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
      ...createAppointmentDto
    });

    return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
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

  async findByPacientId(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { pacientId: id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async findByDoctorId(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { doctorId: id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }

  async requestAppointment(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const doctor = await this.userRepository.findOne({
      where: { id: createAppointmentDto.doctorId },
    });

    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }

    const patient = await this.userRepository.findOne({
      where: { id: createAppointmentDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const appointment = this.appointmentRepository.create({
      ...createAppointmentDto
    });

    appointment.status = "Aguardando aprovacao";

    return this.appointmentRepository.save(appointment);
  }

  async responseAppointment(id: number, status: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id: id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    appointment.status = status;
    return this.appointmentRepository.save(appointment);
  }
}
