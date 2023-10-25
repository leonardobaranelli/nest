import { Injectable } from '@nestjs/common';
import { Posts } from '../../shared/models/relations.config';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class CrudService {
  async findAll() {
    // Get all posts from the database on sequelize
    try {
      const posts = await Posts.findAll();
      return posts;
    } catch (error) {
      console.error(
        'Error when obtaining immovables from the database:',
        error,
      );
      return { error: 'Error when obtaining immovables from the database' };
    }
  }

  async findOne(id: number) {
    // Get a detail of a post from the database on sequelize
    try {
      const post = await Posts.findOne({ where: { id } });
      return post;
    } catch (error) {
      console.error('Error when obtaining immovable from the database:', error);
      return { error: 'Error when obtaining immovable from the database' };
    }
  }

  async create(createPostDto: CreatePostDto) {
    // Add a new immovable to the database on sequelize
    try {
      const post = await Posts.create({createPostDto});
      return post;
    } catch (error) {
      console.error('Error when creating immovable on the database:', error);
      return { error: 'Error when creating immovable on the database' };
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    // Update a post from the database on sequelize
    try {
      const post = await Posts.update(updatePostDto, { where: { id } });
      return post;
    } catch (error) {
      console.error('Error when updating immovable from the database:', error);
      return { error: 'Error when updating immovable from the database' };
    }
  }

  async remove(id: number) {
    // Delete a post from the database on sequelize
    try {
      const post = await Posts.destroy({ where: { id } });
      return post;
    } catch (error) {
      console.error('Error when deleting immovable from the database:', error);
      return { error: 'Error when deleting immovable from the database' };
    }
  }
}
