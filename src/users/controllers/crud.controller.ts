import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CrudService } from '../services/crud.service';
import { User } from '../../shared/models/relations.config';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get()
  findAll(): Promise<User[] | { error: string }> {
    return this.crudService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.crudService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.crudService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(+id);
  }
}
