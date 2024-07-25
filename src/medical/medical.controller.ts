import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { MedicalService } from './medical.service';
import { CreateMedicalDto } from './dto/create-medical.dto';
import { UpdateMedicalDto } from './dto/update-medical.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateBusinessHoursDto } from './dto/update-business-hours.dto';
import { Medical } from './medical.entity';

@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Post()
  create(@Body() createMedicalDto: CreateMedicalDto): Promise<Medical> {
    return this.medicalService.create(createMedicalDto);
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
    @Body() updateMedicalDto: UpdateMedicalDto,
  ): Promise<Medical> {
    return this.medicalService.update(id, updateMedicalDto);
  }

  @Put(':id/password')
  changePassword(
    @Param('id') id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return this.medicalService.changePassword(id, changePasswordDto);
  }

  @Put(':id/business-hours')
  updateBusinessHours(
    @Param('id') id: number,
    @Body() updateBusinessHoursDto: UpdateBusinessHoursDto,
  ): Promise<Medical> {
    return this.medicalService.updateBusinessHours(id, updateBusinessHoursDto);
  }
}
