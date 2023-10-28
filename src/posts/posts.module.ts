import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post, Rent } from 'src/shared/models';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [SequelizeModule.forFeature([Post, Rent])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
