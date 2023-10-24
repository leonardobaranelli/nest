import { Controller, Get } from '@nestjs/common';
import { User } from '../../shared/models/relations.config'; 
import { CrudService } from '../services/crud.service';

@Controller('users')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get('all')
  getUsers(): Promise<User[] | { error: string; }> {
    return this.crudService.getUsers();
  }  
}