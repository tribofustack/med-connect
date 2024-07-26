import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medical } from './medical.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class MedicalService {
  constructor(
    @InjectRepository(Medical)
    private medicalRepository: Repository<Medical>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<Medical> {
    const patient = await this.userRepository.findOne({
      where: { id: createFileDto.userId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const medical = this.medicalRepository.create({
      ...createFileDto,
      user: patient,
    });

    return this.medicalRepository.save(medical);
  }

  async findAll(userId: number): Promise<Medical[]> {
    // TO DO
    // search only pacients files
    return this.medicalRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Medical> {
    const medical = await this.medicalRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!medical) {
      throw new NotFoundException('File not found');
    }
    return medical;
  }

  async remove(id: number): Promise<void> {
    const result = await this.medicalRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('File not found');
    }
  }
}
