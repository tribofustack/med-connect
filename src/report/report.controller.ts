import { Controller, Post, Body } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  generateReport(@Body() data: any) {
    return this.reportService.generateReport(data);
  }
}
