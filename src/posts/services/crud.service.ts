import { Injectable } from '@nestjs/common';
import { Posts } from '../../shared/models/relations.config'; 
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class CrudService {    
    
  create(createPostDto: CreatePostDto) {
    return 'This action adds a new crud';
  }

  findAll() {
    return `This action returns all crud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crud`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} crud`;
  }

  remove(id: number) {
    return `This action removes a #${id} crud`;
  }
  async getPosts() {
      try {      
          const posts = await Posts.findAll();
          return posts;
      } catch (error) {
          console.error('Error when obtaining immovables from the database:', error);
          return { error: 'Error when obtaining immovables from the database' };
      }
  }
}