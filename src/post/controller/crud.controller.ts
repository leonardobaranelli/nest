import { Controller, Get } from '@nestjs/common';
import { Post } from '../post.model'; 
import { CrudService } from '../services/crud.service';

@Controller('immovables')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get('all')
  getImmovables(): Promise<Post[] | { error: string; }> {
    return this.crudService.getImmovables();
  }   
}
