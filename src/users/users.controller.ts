import { Controller, HttpCode, HttpStatus, Get, Param, UsePipes, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.getProfile(Number(id));
  }
}
