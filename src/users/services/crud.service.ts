import { Injectable } from '@nestjs/common';
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
}

