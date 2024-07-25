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
import { Medical } from './medical.entity';

@Controller('medicals')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto): Promise<Medical> {
    return this.medicalService.create(createFileDto);
  }

  @Get()
  findAll(): Promise<Medical[]> {
    return this.medicalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Medical> {
    return this.medicalService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFileDto: UpdateFileDto,
  ): Promise<Medical> {
    return this.medicalService.update(id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.medicalService.remove(id);
  }
}
