import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { MedicalService } from './medical.service';
import { CreateFileDto } from './dto/create-file.dto';
import { MedicalRecords } from './medical-records.entity';

@Controller('medicals')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto): Promise<MedicalRecords | void> {
    return this.medicalService.create(createFileDto);
  }

  @Get(':id')
  findAll(@Param('id') id: number): Promise<MedicalRecords[] | void> {
    return this.medicalService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<MedicalRecords | void> {
    return this.medicalService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.medicalService.remove(id);
  }
}
