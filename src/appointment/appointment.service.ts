import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async findByDoctorId(id: number): Promise<Partial<Appointment>[]> {
    const appointments = await this.appointmentRepository.find({
      select: [
        'appointmentStart',
        'appointmentEnd',
        'description',
        'id',
        'title',
      ],
      where: { doctorId: id },
    });
    if (!appointments || !appointments.length) {
      throw new NotFoundException('Appointments not found');
    }

    return appointments;
  }

  async findByUserId(id: number): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find({
      relations: ['User'],
      where: { userId: id },
    });
    if (!appointments || !appointments.length) {
      throw new NotFoundException('Appointments not found');
    }

    return appointments;
  }

  async request(id: number, userId: number): Promise<Partial<Appointment>> {
    const appointment = await this.appointmentRepository.findOne({
      relations: ['Doctor'],
      where: { userId, id },
    });

    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const status = 'requested';
    const title = `Agendamento com Dr. ${appointment.doctor.name} ${appointment.doctor.lastName}`;
    const appointmentStart = appointment.appointmentStart;
    const appointmentEnd = appointment.appointmentEnd;
    const description = `Solicitado na data de ${appointmentStart} a ${appointmentEnd}`;
    await this.appointmentRepository.save({ status, title, description });

    return {
      title,
      appointmentStart,
      appointmentEnd,
      description,
      status,
    };
  }

  async response(id: number, response: boolean): Promise<Partial<Appointment>> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }

    const appointmentStart = appointment.appointmentStart;
    const appointmentEnd = appointment.appointmentEnd;
    let title = 'Agendamento foi cancelado pelo doutor.';
    let description = 'Agendamento foi cancelado, favor solicitar novamente.';

    if (response) {
      title = 'Agendamento foi aprovado pelo doutor.';
      description = `Confirmado na data de ${appointmentStart} a ${appointmentEnd}`;
    }
    const status = response ? 'approved' : 'disapproved';

    await this.appointmentRepository.save({
      status,
      title,
      description,
    });

    return {
      title,
      appointmentStart,
      appointmentEnd,
      description,
      status,
    };
  }

  async create(): Promise<any> {
    // register - criar appointments ao inserir businessHour
  }
}
