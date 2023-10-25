import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../../shared/models/relations.config'; 

@Injectable()
export class CrudService {

  async getUsers() {
    try {            
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error('Error getting users from database', error);
      return { error: 'Error getting users from database' };
    }
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new crud';
  }

  findAll() {
    return `This action returns all crud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} crud`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} crud`;
  }

  remove(id: number) {
    return `This action removes a #${id} crud`;
  }  
}