import { Injectable } from '@nestjs/common';
import { User } from '../../models/user.model';

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
}

