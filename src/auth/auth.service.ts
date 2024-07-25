import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/user.entity';
import { Medical } from 'src/medical/medical.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Medical)
    private medicalRepository: Repository<Medical>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async validateMedical(email: string, pass: string): Promise<any> {
    const medical = await this.medicalRepository.findOne({ where: { email } });
    if (medical && (await bcrypt.compare(pass, medical.password))) {
      const { ...result } = medical;
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);
    const medical = await this.validateMedical(email, password);

    if (!user && !medical) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = user
      ? { email: user.email, sub: user.id }
      : { email: medical.email, sub: medical.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
