import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '../shared/models';
import { Rent as RentModel } from '../shared/models';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('posts')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Get()
  findAll(): Promise<PostModel[] | { error: string }> {
    return this.postService.findAll();
  }

  @Get('/condition/:condition')
  filterByCondition(
    @Param('condition') condition,
  ): Promise<PostModel[] | { error: string }> {
    return this.postService.filterByCondition(condition);
  }

  @Get('rent')
  findAllRents(): Promise<RentModel[] | { error: string }> {
    return this.postService.findAllRents();
  }

  // @Get('type/:type')
  // filterByType(
  //   @Param('type') type,
  // ): Promise<PostModel[] | { error: string }> {
  //   return this.postService.filterByType(type);
  // }

  @Get(
    /* ':id[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12}' */ ':id',
  )
  findOne(@Param('id') id) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto) {
    return this.postService.create(createPostDto);
  }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile (@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files)
    
    const uploadPromises = files.map(async (file) => {
      const result = await this.cloudinaryService.uploadFile(file);
      console.log(result.secure_url);
      return result.secure_url;
    });
  
    const uploadedFiles = await Promise.all(uploadPromises);
    return uploadedFiles;
  }


  @Post('rent')
  createRent(@Body() createRentDto) {
    return this.postService.createRent(createRentDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.postService.remove(id);
  }
}
