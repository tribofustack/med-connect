import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { Report } from './report.entity';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto): Promise<Report> {
    return this.reportService.create(createFileDto);
  }

  @Get()
  findAll(): Promise<Report[]> {
    return this.reportService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Report> {
    return this.reportService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateFileDto: UpdateFileDto,
  ): Promise<Report> {
    return this.reportService.update(id, updateFileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.reportService.remove(id);
  }
}
