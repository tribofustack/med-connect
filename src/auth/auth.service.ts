import * as bcrypt from 'bcrypt';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/user.entity';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    
    try {
      const url = `${process.env.AUTH_URL}/consumers/${process.env.CONSUMER}/jwt`;
      const { data: response } = await axios.get(url);
      const [{ key, secret }] = response.data;

      return this.generateToken({ payload }, secret, key);
    } catch (error) {
      return this.jwtService.sign(payload)
    }
  }
  
  generateToken({ payload }, secret, key) {
    const token = this.jwtService.sign(payload, {secret, keyid: key, expiresIn: '1d' });
    return token;
  }
}
