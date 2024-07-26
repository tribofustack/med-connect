import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { BusinessHour } from 'src/user/businessHour.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    @InjectRepository(BusinessHour)
    private businessHoursRepository: Repository<BusinessHour>,
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
      where: { doctorId: id, status: 'requested' },
    });
    if (!appointments || !appointments.length) {
      throw new NotFoundException('Appointments not found');
    }

    return appointments;
  }

  async findByUserId(id: number): Promise<Appointment[]> {
    const appointments = await this.appointmentRepository.find({
      select: [
        'appointmentStart',
        'appointmentEnd',
        'description',
        'id',
        'title',
      ],
      where: { userId: id },
    });
    if (!appointments || !appointments.length) {
      throw new NotFoundException('Appointments not found');
    }

    return appointments;
  }

  async request(
    userId: number,
    CreateAppointment: CreateAppointmentDto,
  ): Promise<Partial<Appointment>> {
    const status = 'requested';
    const title = `Agendamento com Dr. ${CreateAppointment.doctorName}`;
    const appointmentStart = CreateAppointment.event.start_date;
    const appointmentEnd = CreateAppointment.event.end_date;
    const description = `Solicitado na data de ${appointmentStart} a ${appointmentEnd}`;
    const doctorId = CreateAppointment.doctorId;

    try {
      await this.appointmentRepository.save({
        status,
        title,
        description,
        appointmentStart,
        appointmentEnd,
        userId,
        doctorId,
        meet_url: 'url.com',
      });
    } catch (error) {
      console.log(error);
    }

    await this.businessHoursRepository.update(
      { id: CreateAppointment.businessId },
      { status: 'agendado' },
    );

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

    await this.appointmentRepository.update({ id: id }, { status: status });

    return {
      title,
      appointmentStart,
      appointmentEnd,
      description,
      status,
    };
  }

  async create(): Promise<any> {
    // register - criar appointments ao inserir businessHours
  }
}
