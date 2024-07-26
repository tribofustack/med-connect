import * as bcrypt from 'bcryptjs';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DoctorLoginDto, UserLoginDto } from './dto/login.dto';
import { User } from 'src/user/user.entity';
import axios from 'axios';
import { Doctor } from 'src/user/doctor.entity';
import { env } from 'process';

const requiredFields = ['email', 'password'];

type credentialType = {
  email: string;
  password: string;
  cpf?: string;
  crm?: string;
};

type payloadType = { email: string; sub: number; role: 'doctor' | 'user' };

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private jwtService: JwtService,
  ) {}

  async validate(credentials: credentialType): Promise<User | Doctor> {
    let userExists = null;
    let doctorExists = null;

    if (credentials.cpf) {
      const user = await this.usersRepository.findOne({
        where: { email: credentials.email },
      });
      if (!user) throw new NotFoundException('User not exists');

      const [isValidCpf, isPassCpf] = await Promise.all([
        bcrypt.compare(credentials.cpf, user.cpf),
        bcrypt.compare(credentials.password, user.password),
      ]);

      if (!isValidCpf || !isPassCpf)
        throw new UnauthorizedException('Invalid credentials');

      userExists = user;
    }

    if (credentials.crm) {
      const doctor = await this.doctorsRepository.findOne({
        where: { email: credentials.email },
      });
      if (!doctor) throw new NotFoundException('Doctor not exists');

      const [isValidCpf, isPassCpf] = await Promise.all([
        bcrypt.compare(credentials.crm, doctor.crm),
        bcrypt.compare(credentials.password, doctor.password),
      ]);

      if (!isValidCpf || !isPassCpf)
        throw new UnauthorizedException('Invalid credentials');

      doctorExists = doctor;
    }

    return userExists ?? doctorExists;
  }

  async loginUser(loginDto: UserLoginDto) {
    requiredFields.push('cpf');
    requiredFields.forEach((field) => {
      if (!loginDto[field]) {
        throw new BadRequestException(`Missing field ${field}`);
      }
    });

    const { email, cpf, password } = loginDto;
    const credentials = {
      email,
      password,
      cpf,
      crm: null,
    };
    const user = (await this.validate(credentials)) as User;

    const payload = {
      email: user.email,
      sub: user.id,
      role: 'user',
    } as payloadType;

    return this.login(payload);
  }

  async loginDoctor(loginDto: DoctorLoginDto) {
    requiredFields.push('crm');
    requiredFields.forEach((field) => {
      if (!loginDto[field]) {
        throw new BadRequestException(`Missing field ${field}`);
      }
    });

    const { email, crm, password } = loginDto;
    const credentials = {
      email,
      password,
      crm,
      cpf: null,
    };
    const doctor = (await this.validate(credentials)) as Doctor;

    const payload = {
      email: doctor.email,
      sub: doctor.id,
      role: 'doctor',
    } as payloadType;

    return this.login(payload);
  }

  async login(payload: payloadType) {
    try {
      const url = `${env.AUTH_URL}/consumers/${env.CONSUMER}/jwt`;

      const { data: response } = await axios.get(url);
      const [{ key, secret }] = response.data;

      return this.generateToken(payload, secret, key);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  generateToken(payload: payloadType, secret: string, key: string) {
    const token = this.jwtService.sign(payload, {
      secret,
      keyid: key,
      expiresIn: '1d',
    });

    return token;
  }
}
