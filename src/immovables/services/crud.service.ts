import { Injectable } from '@nestjs/common';
import { Immovable } from '../immovable.model';

@Injectable()
export class CrudService {    
    
    async getImmovables() {
        try {      
            const immovables = await Immovable.findAll();
            return immovables;
        } catch (error) {
            console.error('Error when obtaining immovables from the database:', error);
            return { error: 'Error when obtaining immovables from the database' };
        }
    }
}


