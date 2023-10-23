import { Controller, Get } from '@nestjs/common';
import { Immovable } from '../immovable.model'; 
import { CrudService } from '../services/crud.service';

@Controller('immovables')
export class CrudController {
  constructor(private readonly crudService: CrudService) {}

  @Get('all')
  getImmovables(): Promise<Immovable[] | { error: string; }> {
    return this.crudService.getImmovables();
  }   
}
