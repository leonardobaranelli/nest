import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { Post as PostModel } from '../../shared/models';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostModel[] | { error: string }> {
    return this.postService.findAll();
  }

  @Get('/condition/:condition')
  async filterByTypeHardcode(@Param('condition') condition: string) {
    const result = await this.postService.filterByTypeHardcode(condition);
    return result;
  }

  @Get('type/:type')
  filterByType(
    @Param('type') type: string,
  ): Promise<PostModel[] | { error: string }> {
    return this.postService.filterByType(type);
  }

  @Get(
    ':id[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89abAB][0-9a-f]{3}-[0-9a-f]{12}',
  )
  findOne(@Param('id') id: string) {
    return this.postService.findOne(id);
  }

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(id);
  }
}
