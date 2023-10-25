import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Posts } from '../../shared/models/relations.config'; 
import { CrudService } from '../services/crud.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get('all')
  getPosts(): Promise<Posts[] | { error: string; }> {
    return this.crudService.getPosts();
  }   

  // @Get()
  // findAll() {
  //   return this.crudService.findAll();
  // }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.crudService.create(createPostDto);
  } 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.crudService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(+id);
  }
}