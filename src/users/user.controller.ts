import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../shared/models';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll().catch((e) => {
      throw e;
    });
  }

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.userService.findOneByEmail(email).catch((e) => {
      throw e;
    });
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id).catch((e) => {
      throw e;
    });
  }

  @Post()
  create(@Body() createUserDto) {
    return this.userService.create(createUserDto).catch((e) => {
      throw e;
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto) {
    return this.userService.update(id, updateUserDto).catch((e) => {
      throw e;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id).catch((e) => {
      throw e;
    });
  }
}
