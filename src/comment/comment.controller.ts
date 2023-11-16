import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto).catch((e) => {
      throw e;
    });
  }

  @Get(':postId')
  fromPost(@Param('postId') postId: string) {
    return this.commentService.fromPost(postId).catch((e) => {
      throw e;
    });
  }

  @Get('count')
  count() {
    return this.commentService.count().catch((e) => {
      throw e;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(id).catch((e) => {
      throw e;
    });
  }
}
