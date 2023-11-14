import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll().catch((e) => {
      throw e;
    });
  }

  @Get('/condition/:condition')
  filterByCondition(@Param('condition') condition: string) {
    if (condition !== 'sell' && condition !== 'rent')
      throw new BadRequestException('Invalid type');

    return this.postService.filterByCondition(condition).catch((e) => {
      throw e;
    });
  }

  @Get('rent')
  findAllRents() {
    return this.postService.findAllRents().catch((e) => {
      throw e;
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id).catch((e) => {
      throw e;
    });
  }

  @Post()
  create(@Body() createPostDto) {
    return this.postService.create(createPostDto).catch((e) => {
      throw e;
    });
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return this.postService.uploadFiles(files).catch((e) => {
      throw e;
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto).catch((e) => {
      throw e;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id).catch((e) => {
      throw e;
    });
  }

  /*
  @Post('rent')
  createRent(@Body() createRentDto: CreateRentDto) {
    return this.postService.createRent(createRentDto).catch((e) => {
      throw e;
    });
  }*/
}


