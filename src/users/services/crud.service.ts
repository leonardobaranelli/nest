import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../shared/models/relations.config';

@Injectable()
export class CrudService {
  async create(createUserDto: CreateUserDto) {
    // Create a new user on the database on sequelize
    try {
      const user = await User.create({createUserDto});
      return user;
    } catch (error) {
      console.error('Error when creating user on the database:', error);
      return { error: 'Error when creating user on the database' };
    }
  }

  async findAll() {
    // Get all users from the database on sequelize
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error('Error when obtaining users from the database:', error);
      return { error: 'Error when obtaining users from the database' };
    }
  }

  async findOne(id: number) {
    // Get a detail of a user from the database on sequelize
    try {
      const user = await User.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.error('Error when obtaining user from the database:', error);
      return { error: 'Error when obtaining user from the database' };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // Update a user from the database on sequelize
    try {
      const user = await User.update(updateUserDto, { where: { id } });
      return user;
    } catch (error) {
      console.error('Error when updating user from the database:', error);
      return { error: 'Error when updating user from the database' };
    }
  }

  async remove(id: number) {
    // Delete a user from the database on sequelize
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (error) {
      console.error('Error when deleting user from the database:', error);
      return { error: 'Error when deleting user from the database' };
    }
  }

  async removeLogin(id: number) {
    // Unactivate a user from the database on sequelize
    try {
      const user = await User.update({ active: false }, { where: { id } });
      return user;
    } catch (error) {
      console.error('Error when unactivating user from the database:', error);
      return { error: 'Error when unactivating user from the database' };
    }
  }
}
