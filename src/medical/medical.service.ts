import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medical } from './medical.entity';
import { CreateMedicalDto } from './dto/create-medical.dto';
import { UpdateMedicalDto } from './dto/update-medical.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateBusinessHoursDto } from './dto/update-business-hours.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MedicalService {
  constructor(
    @InjectRepository(Medical)
    private medicalRepository: Repository<Medical>,
  ) {}

  async create(createMedicalDto: CreateMedicalDto): Promise<Medical> {
    const hashedPassword = await bcrypt.hash(createMedicalDto.password, 10);
    const medical = this.medicalRepository.create({
      ...createMedicalDto,
      password: hashedPassword,
    });
    return this.medicalRepository.save(medical);
  }

  async findAll(): Promise<Medical[]> {
    return this.medicalRepository.find();
  }

  async findOne(id: number): Promise<Medical> {
    const medical = await this.medicalRepository.findOne({ where: { id } });
    if (!medical) {
      throw new NotFoundException('Medical professional not found');
    }
    return medical;
  }

  async update(
    id: number,
    updateMedicalDto: UpdateMedicalDto,
  ): Promise<Medical> {
    const medical = await this.medicalRepository.preload({
      id,
      ...updateMedicalDto,
    });
    if (!medical) {
      throw new NotFoundException('Medical professional not found');
    }
    return this.medicalRepository.save(medical);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const medical = await this.findOne(id);
    const passwordMatch = await bcrypt.compare(
      changePasswordDto.currentPassword,
      medical.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Current password is incorrect');
    }
    medical.password = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.medicalRepository.save(medical);
  }

  async updateBusinessHours(
    id: number,
    updateBusinessHoursDto: UpdateBusinessHoursDto,
  ): Promise<Medical> {
    const medical = await this.findOne(id);
    medical.business_hours = updateBusinessHoursDto.business_hours;
    return this.medicalRepository.save(medical);
  }
}
