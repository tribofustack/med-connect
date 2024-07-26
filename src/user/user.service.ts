import * as bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepository.save(user);
  }

  async changePassword(
    id: number,
    type: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = type == "doctor" ? await this.findPacient(id) : await this.findDoctor(id);
    const passwordMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Current password is incorrect');
    }
    user.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.userRepository.save(user);
  }

  async findPacients(): Promise<User[]> {
    return this.userRepository.find({where: { type: "doctor" }});
  }

  async findPacient(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id, type: "doctor" } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findDoctors(): Promise<User[]> {
    return this.userRepository.find({
      where: { type: "doctor" }
    });
  }

  async findDoctor(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id: id, type: "doctor" }
    });
  }

  async findDoctorSchedule(doctorId: number): Promise<any> {
    const doctor = await this.userRepository.findOne({
      where: { id: doctorId, type: "doctor" },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor.business_hours;
  }

  async rateDoctor(doctorId: number, rating: number): Promise<User> {
    const doctor = await this.userRepository.findOne({
      where: { id: doctorId, type: "doctor" },
    });
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    doctor.rating = rating;
    return this.userRepository.save(doctor);
  }
}
