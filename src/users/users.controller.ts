import { Controller, Get } from '@nestjs/common';
import { User } from './user.model';

@Controller('users')
export class UsersController {
    
  @Get()
  async getUsers() {
    try {      
      
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error('Error getting users from database', error);
      return { error: 'Error getting users from database' };
    }
  }
}