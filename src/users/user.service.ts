import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../shared/models';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // Create a new user on the database on sequelize
    try {
      const user = await this.userModel.create({ ...createUserDto });
      return user;
    } catch (error) {
      console.error('Error when creating user on the database:', error);
      return { error: 'Error when creating user on the database' };
    }
  }

  async findOneByEmail(email: string) {
    // verify if the user exists in the database 
    try {
      const user = await this.userModel.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error when obtaining user from the database:', error);
      return undefined;
    }
  }


  async findAll() {
    // Get all users from the database on sequelize
    try {
      const users = await this.userModel.findAll();
      return users;
    } catch (error) {
      console.error('Error when obtaining users from the database:', error);
      return { error: 'Error when obtaining users from the database' };
    }
  }

  async findOne(id: string) {
    // Get a detail of a user from the database on sequelize
    try {
      const user = await this.userModel.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.error('Error when obtaining user from the database:', error);
      return { error: 'Error when obtaining user from the database' };
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    // Update a user from the database on sequelize
    try {
      const user = await this.userModel.update(updateUserDto, {
        where: { id },
      });
      return user;
    } catch (error) {
      console.error('Error when updating user from the database:', error);
      return { error: 'Error when updating user from the database' };
    }
  }

  async remove(id: string) {
    // Delete a user from the database on sequelize
    try {
      const user = await this.userModel.destroy({ where: { id } });
      return user;
    } catch (error) {
      console.error('Error when deleting user from the database:', error);
      return { error: 'Error when deleting user from the database' };
    }
  }

  async removeLogin(id: string) {
    // Unactivate a user from the database on sequelize
    try {
      const user = await this.userModel.update(
        { active: false },
        { where: { id } },
      );
      return user;
    } catch (error) {
      console.error('Error when unactivating user from the database:', error);
      return { error: 'Error when unactivating user from the database' };
    }
  }
}
