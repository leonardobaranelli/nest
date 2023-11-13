import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../shared/models';
import { CreateAuthUserDto } from './dto/create-3th-auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto | CreateAuthUserDto) {
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
    const user = await this.userModel.findOne({ where: { email } })
      .catch(error => {
        throw new Error('Error when obtaining user from the database');
      })
    return user;
  }

  async findAll() {
    // Get all users from the database on sequelize
    try {
      const users = await this.userModel.findAll({paranoid: false});
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
    // Find the user first
    const user = await this.userModel.findOne({ where: { id } });
  
    if (!user) {
      return { error: 'User not found' };
    }
  
    // Soft delete the user
    await user.destroy();

  
    // Get the soft deleted user
    const deletedUser = await this.userModel.findOne({ where: { id }, paranoid: false });
  
    if (deletedUser) {
      console.log(deletedUser.deletedAt); 
    } else {
      console.log('User not found');
    }
  
    return "Deleted Successfully";
  }

  async removeLogin(id: string) {
    // Unactivate a user from the database on sequelize
    const user = await this.userModel.update(
      { active: false },
      { where: { id } },
    )
    .catch(err => { error: err })
    return user;
  }
}
