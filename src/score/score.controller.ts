import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':postId')
  findPost(@Param('postId') postId: string) {
    return this.scoreService.findPost(postId);
  }

  @Post('create')
  create(@Body() createScoreDto: CreateScoreDto) {
    return this.scoreService.create(createScoreDto);
  }

  @Patch('update/:scoreId')
  update(
    @Param('scoreId') scoreId: string,
    @Body() updateScoreDto: UpdateScoreDto,
  ) {
    return this.scoreService.update(scoreId, updateScoreDto);
  }
}
