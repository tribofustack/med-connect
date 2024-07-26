import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Doctor } from './doctor.entity';
import * as bcrypt from 'bcrypt';
import moment from 'moment';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { RegisterBusinessHoursDto } from './dto/register-business-hours.dto';

const createUserRequiredFields = [
  'name',
  'lastName',
  'email',
  'password',
  'cpf',
];

const createDoctorRequiredFields = [
  'name',
  'lastName',
  'email',
  'password',
  'crm',
];

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserRequiredFields.forEach((field) => {
      if (!createUserDto[field]) throw new Error(`Missing field: ${field}`);
    });

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const hashedCpf = await bcrypt.hash(createUserDto.cpf, 10);

    const user = this.usersRepository.create({
      email: createUserDto.email,
      name: createUserDto.name,
      lastName: createUserDto.lastName,
      cpf: hashedCpf,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    createDoctorRequiredFields.forEach((field) => {
      if (!createDoctorDto[field]) throw new Error(`Missing field: ${field}`);
    });

    const hashedPassword = await bcrypt.hash(createDoctorDto.password, 10);
    const hashedCRM = await bcrypt.hash(createDoctorDto.crm, 10);

    let cpf = null;
    if (createDoctorDto.cpf) {
      cpf = await bcrypt.hash(createDoctorDto.cpf, 10);
    }

    const doctor = this.doctorsRepository.create({
      email: createDoctorDto.email,
      name: createDoctorDto.name,
      lastName: createDoctorDto.lastName,
      cpf,
      crm: hashedCRM,
      password: hashedPassword,
    });

    return this.doctorsRepository.save(doctor);
  }

  async findDoctors(): Promise<Partial<Doctor>[]> {
    return this.doctorsRepository.find({
      select: ['id', 'name', 'email', 'lastName', 'address'],
      where: {
        businessHoursStart: Not(IsNull()),
        businessHoursEnd: Not(IsNull()),
      },
    });
  }

  async register(
    id: number,
    registerBusinessHours: RegisterBusinessHoursDto,
  ): Promise<any> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id },
    });
    if (!doctor) throw new Error('Doctor not found');

    const currentDate = moment().add(-3, 'hours');
    console.log('\n currentDate', currentDate, '\n');
    const startDate = moment(registerBusinessHours.startDate);
    const endDate = moment(registerBusinessHours.endDate);

    if (!startDate.isValid() || !endDate.isValid())
      throw new Error('Invalid dates');

    if (
      startDate.isBefore(currentDate) ||
      endDate.isBefore(currentDate) ||
      endDate.isBefore(startDate)
    )
      throw new Error('Invalid interval dates');

    const difference = startDate.diff(endDate, 'hours');
    // appointment service
    console.log('\n diff', difference, '\n');
  }
}
