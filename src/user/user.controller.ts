import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

import { Doctor } from './doctor.entity';
import { RegisterBusinessHoursDto } from './dto/register-business-hours.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('doctors')
  async findDoctors(): Promise<Partial<Doctor>[]> {
    return this.userService.findDoctors();
  }

  @Put('doctors/:id/register')
  async register(
    @Param('id') id: number,
    @Body() registerBusinessHours: RegisterBusinessHoursDto,
  ): Promise<any> {
    return this.userService.register(id, registerBusinessHours);
  }
}
