import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFileDto: CreateFileDto): Promise<Report> {
    const patient = await this.userRepository.findOne({
      where: { id: createFileDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const report = this.reportRepository.create({
      ...createFileDto,
      patient,
    });

    return this.reportRepository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.reportRepository.find({ relations: ['patient'] });
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { id },
      relations: ['patient'],
    });
    if (!report) {
      throw new NotFoundException('File not found');
    }
    return report;
  }

  async update(id: number, updateFileDto: UpdateFileDto): Promise<Report> {
    const report = await this.reportRepository.preload({
      id,
      ...updateFileDto,
    });
    if (!report) {
      throw new NotFoundException('File not found');
    }
    return this.reportRepository.save(report);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reportRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('File not found');
    }
  }
}
