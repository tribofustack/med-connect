import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { Report } from 'src/report/entities/report/report';

@Module({
  imports: [TypeOrmModule.forFeature([Report])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
