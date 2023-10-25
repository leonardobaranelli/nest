import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../shared/models/relations.config'; 
import { CrudService } from '../services/crud.service';

@Controller('users')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get('all')
  getUsers(): Promise<User[] | { error: string; }> {
    return this.crudService.getUsers();
  }  

  // @Get()
  // findAll() {
  //   return this.crudService.findAll();
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.crudService.create(createUserDto);
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(+id);
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