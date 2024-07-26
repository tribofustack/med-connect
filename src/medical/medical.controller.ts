import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MedicalService } from './medical.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './file.entity';

@Controller('medicals')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto): Promise<File> {
    return this.medicalService.create(createFileDto);
  }

  @Get(':id')
  findAll(@Param('id') id: number): Promise<File[]> {
    return this.medicalService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<File> {
    return this.medicalService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.medicalService.remove(id);
  }
}
