import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
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
  ): Promise<Appointment | void> {
    console.log(createAppointmentDto);
    // const doctor = await this.userRepository.findOne({
    //   where: { id: createAppointmentDto.doctorId },
    // });
    // const pacientId = await this.userRepository.findOne({
    //   where: { id: createAppointmentDto.pacientId },
    // });

    // if (!doctor || !pacientId) {
    //   throw new NotFoundException('Doctor or Patient not found');
    // }

    // const appointment = this.appointmentRepository.create({
    //   ...createAppointmentDto,
    // });

    // return this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[] | void> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number): Promise<Appointment | void> {
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
  ): Promise<Appointment | void> {
    console.log(id, updateAppointmentDto);

    // const appointment = await this.appointmentRepository.preload({
    //   id,
    //   ...updateAppointmentDto,
    // });
    // if (!appointment) {
    //   throw new NotFoundException('Appointment not found');
    // }
    // return this.appointmentRepository.save(appointment);
  }

  async remove(id: number): Promise<void | void> {
    console.log(id);
    // const result = await this.appointmentRepository.delete(id);
    // if (result.affected === 0) {
    //   throw new NotFoundException('Appointment not found');
    // }
  }

  async findByPacientId(id: number): Promise<Appointment | void> {
    console.log(id);
    // const appointment = await this.appointmentRepository.findOne({
    //   where: { pacientId: id },
    // });
    // if (!appointment) {
    //   throw new NotFoundException('Appointment not found');
    // }
    // return appointment;
  }

  async findByDoctorId(id: number): Promise<Appointment | void> {
    console.log(id);

    // const appointment = await this.appointmentRepository.findOne({
    //   where: { doctorId: id },
    // });
    // if (!appointment) {
    //   throw new NotFoundException('Appointment not found');
    // }
    // return appointment;
  }

  async requestAppointment(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment | void> {
    console.log(createAppointmentDto);

    // const doctor = await this.userRepository.findOne({
    //   where: { id: createAppointmentDto.doctorId },
    // });

    // if (!doctor) {
    //   throw new NotFoundException('Doctor not found');
    // }

    // const pacientId = await this.userRepository.findOne({
    //   where: { id: createAppointmentDto.pacientId },
    // });

    // if (!pacientId) {
    //   throw new NotFoundException('Pacient not found');
    // }

    // const appointment = this.appointmentRepository.create({
    //   ...createAppointmentDto,
    // });

    // appointment.status = 'Aguardando aprovacao';

    // return this.appointmentRepository.save(appointment);
  }

  async responseAppointment(
    id: number,
    status: string,
  ): Promise<Appointment | void> {
    console.log(id, status);
    // const appointment = await this.appointmentRepository.findOne({
    //   where: { id: id },
    // });
    // if (!appointment) {
    //   throw new NotFoundException('Appointment not found');
    // }
    // appointment.meet_url = 'https://meet.google.com.br/acfdbe';
    // appointment.status = status;
    // return this.appointmentRepository.save(appointment);
  }
}
