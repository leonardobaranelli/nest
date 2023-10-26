import { Injectable } from '@nestjs/common';
import { Posts } from '../../shared/models/relations.config';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { measureMemory } from 'vm';


@Injectable()
export class CrudService {
  async filterByCountry(country: string) {
    // Get post by country from the database on sequelize
    try {
      const posts = await Posts.findAll({ where: { country } });
      return posts;
    } catch (error) {
      console.error('Error when obtaining posts from the database:', error);
      return { error: 'Error when obtaining posts from the database' };
    }
  }

  // async filterByTypeHardcod(type: string) {
  //   try {
  //     // Get posts by type from the database on sequelize
  //     if (type !== 'sell' && type !== 'rent') throw new Error('Invalid type');
  //     const posts = jsonData;
  //     return posts;
  //   } catch (error) {
  //     const message =
  //       error.message || 'Error when obtaining posts from the database';
  //     return { error: message };
  //   }
  // }

  async filterByType(type: string) {
    try {
      // Get posts by type from the database on sequelize
      if (type !== 'sell' && type !== 'rent') throw new Error('Invalid type');
      const posts = await Posts.findAll({ where: { type } });
      return posts;
    } catch (error) {
      const message =
        error.message || 'Error when obtaining posts from the database';
      return { error: message };
    }
  }

  async findAll() {
    // Get all posts from the database on sequelize
    try {
      const posts = await Posts.findAll();
      return posts;
    } catch (error) {
      console.error('Error when obtaining posts from the database:', error);
      return { error: 'Error when obtaining posts from the database' };
    }
  }

  async findOne(id: string) {
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
      const post = await Posts.create({ ...createPostDto });
      return post;
    } catch (error) {
      console.error('Error when creating immovable on the database:', error);
      return { error: 'Error when creating immovable on the database' };
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    // Update a post from the database on sequelize
    try {
      const [post] = await Posts.update(updatePostDto, { where: { id } });
      // Validate if the post updated
      if (post === 0) throw new Error('Property not found');
      return post;        

    } catch (error) {
      const message =
        error.message || 'Error when obtaining posts from the database';
      return { error: message };
    }
  }

  async remove(id: string) {
    // Delete a post from the database on sequelize
    try {
      const postDel = await Posts.destroy({ where: { id } });
      if(!postDel) throw new Error('Post not found');
      return postDel;
    } catch (error) {
      console.error('Error when deleting immovable from the database:', error);
      return { error: 'Error when deleting immovable from the database' };
    }
  }
}
