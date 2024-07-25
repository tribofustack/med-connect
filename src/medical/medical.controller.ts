import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { MedicalService } from './medical.service';

@Controller('medical')
export class MedicalController {
  constructor(private readonly medicalService: MedicalService) {}

  @Post()
  createMedicalRecord(@Body() data: any) {
    return this.medicalService.createMedicalRecord(data);
  }

  @Get(':userId')
  getMedicalRecords(@Param('userId') userId: string) {
    return this.medicalService.getMedicalRecords(userId);
  }

  @Put(':id')
  updateMedicalRecord(@Param('id') id: string, @Body() data: any) {
    return this.medicalService.updateMedicalRecord(id, data);
  }
}
