import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from '../shared/models';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private readonly filePath: string;
  constructor(
    @InjectModel(Post)
    private postsModel: typeof Post,
  ) {} 

  async filterByCondition(condition: string) {
    try {
      // Get posts by type from the database on sequelize
      if (condition !== 'sell' && condition !== 'rent')
        throw new Error('Invalid type');

      const posts = await this.postsModel.findAll({
        where: { condition },
      });

      return posts;
    } catch (error) {
      const message =
        error.message || 'Error when obtaining posts from the database';
      return { error: message };
    }
  }

  async filterByCountry(country: string) {
    // Get post by country from the database on sequelize
    try {
      const posts = await this.postsModel.findAll({ where: { country } });
      return posts;
    } catch (error) {
      console.error('Error when obtaining posts from the database:', error);
      return { error: 'Error when obtaining posts from the database' };
    }
  }

  async findAll() {
    // Get all posts from the database on sequelize
    try {
      const posts = await this.postsModel.findAll();
      return posts;
    } catch (error) {
      console.error('Error when obtaining posts from the database:', error);
      return { error: 'Error when obtaining posts from the database' };
    }
  }

  async findOne(id: string) {
    // Get a detail of a post from the database on sequelize
    try {
      const post = await this.postsModel.findOne({ where: { id } });
      return post;
    } catch (error) {
      console.error('Error when obtaining immovable from the database:', error);
      return { error: 'Error when obtaining immovable from the database' };
    }
  }

  async create(createPostDto: CreatePostDto) {
    // Add a new immovable to the database on sequelize
    try {
      const post = await this.postsModel.create({ ...createPostDto });
      return post;
    } catch (error) {
      console.error('Error when creating immovable on the database:', error);
      return { error: 'Error when creating immovable on the database' };
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // Update a post from the database on sequelize
    try {
      const [post] = await this.postsModel.update(updatePostDto, {
        where: { id },
      });
      // Validate if the post updated
      if (post === 0) throw new Error('Property not found');
      else if (post === 1) return 'Property updated successfully';
      else return `${post} Properties updated successfully`;
    } catch (error) {
      const message =
        error.message || 'Error when obtaining posts from the database';
      return { error: message };
    }
  }

  async remove(id: string) {
    // Delete a post from the database on sequelize
    try {
      const postDel = await this.postsModel.destroy({ where: { id } });
      if (!postDel) throw new Error('Post not found');
      return 'Post deleted successfully';
    } catch (error) {
      console.error('Error when deleting immovable from the database:', error);
      return { error: 'Error when deleting immovable from the database' };
    }
  }
}
