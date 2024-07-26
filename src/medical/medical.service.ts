import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalRecords } from './medical-records.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class MedicalService {
  constructor(
    @InjectRepository(MedicalRecords)
    private medicalRepository: Repository<MedicalRecords>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<MedicalRecords | void> {
    console.log(createFileDto);
  }

  async findAll(userId: number): Promise<MedicalRecords[] | void> {
    console.log(userId);
  }

  async findOne(id: number): Promise<MedicalRecords | void> {
    console.log(id);
  }

  async remove(id: number): Promise<void> {
    console.log(id);
  }
}
