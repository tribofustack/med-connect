import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Appointment } from 'src/appointment/appointment.entity';

import { CreateBusinessHourDTO } from './dto/create-business-hour.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | void> {
    console.log(createUserDto);
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    // const user = this.userRepository.create({
    //   ...createUserDto,
    //   password: hashedPassword,
    // });
    // return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | void> {
    console.log(id, updateUserDto);
    // const user = await this.userRepository.preload({
    //   id,
    //   ...updateUserDto,
    // });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // return this.userRepository.save(user);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void | void> {
    console.log(id, changePasswordDto);
    // const user = await this.userRepository.findOne({ where: { id: id } });
    // const passwordMatch = await bcrypt.compare(
    //   changePasswordDto.currentPassword,
    //   user.password,
    // );
    // if (!passwordMatch) {
    //   throw new BadRequestException('Current password is incorrect');
    // }
    // user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    // await this.userRepository.save(user);
  }

  async findPacients(): Promise<User[] | void> {
    // return this.userRepository.find({ where: { type: 'pacient' } });
  }

  async findPacient(id: number): Promise<User | void> {
    console.log(id);
    // const user = await this.userRepository.findOne({
    //   where: { id: id, type: 'pacient' },
    // });
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    // return user;
  }

  async findDoctors(): Promise<any[] | void> {
    // const doctors = await this.userRepository.find({
    //   where: { type: 'doctor' },
    // });
    // const doctorIds = doctors.map((doctor) => doctor.id);
    // const appointments = await this.appointmentRepository.find({
    //   where: {
    //     doctorId: In(doctorIds),
    //   },
    // });
    // const doctorsWithAppointments = doctors.map((doctor) => {
    //   const doctorAppointments = appointments.filter(
    //     (appointment) => appointment.doctorId === doctor.id,
    //   );
    //   return { ...doctor, appointments: doctorAppointments };
    // });
    // return doctorsWithAppointments;
  }

  async findDoctor(id: number): Promise<User | void> {
    console.log(id);
    // return this.userRepository.findOne({
    //   where: { id: id, type: 'doctor' },
    // });
  }

  async findDoctorSchedule(doctorId: number): Promise<any | void> {
    console.log(doctorId);
    // const doctor = await this.userRepository.findOne({
    //   where: { id: doctorId, type: 'doctor' },
    // });
    // if (!doctor) {
    //   throw new NotFoundException('Doctor not found');
    // }
    // return doctor.business_hours;
  }

  async rateDoctor(doctorId: number, rating: number): Promise<User | void> {
    console.log(doctorId, rating);
    // const doctor = await this.userRepository.findOne({
    //   where: { id: doctorId, type: 'doctor' },
    // });
    // if (!doctor) {
    //   throw new NotFoundException('Doctor not found');
    // }
    // doctor.rating = rating;
    // return this.userRepository.save(doctor);
  }

  async createBusinessHour(
    doctorId: number,
    createBusinessHourDTO: CreateBusinessHourDTO,
  ): Promise<User | void> {
    console.log(doctorId, createBusinessHourDTO);
    // const doctor = await this.userRepository.findOne({
    //   where: { id: doctorId, type: 'doctor' },
    // });
    // if (!doctor) {
    //   throw new NotFoundException('Doctor not found');
    // }

    // const business_hours = doctor.business_hours ? doctor.business_hours : [];
    // business_hours.push(createBusinessHourDTO);
    // doctor.business_hours = business_hours;
    // return this.userRepository.save(doctor);
  }
}
