import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() data: any) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: any) {
    return this.userService.updateUser(id, data);
  }
}
