import { Injectable } from '@nestjs/common';
import { Post } from '../../shared/models/relations.config'; 

@Injectable()
export class CrudService {    
    
    async getImmovables() {
        try {      
            const post = await Post.findAll();
            return post;
        } catch (error) {
            console.error('Error when obtaining immovables from the database:', error);
            return { error: 'Error when obtaining immovables from the database' };
        }
    }
}


