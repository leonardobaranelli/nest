import { Injectable } from '@nestjs/common';
import { Immovable } from './immovable.model';

@Injectable()
export class ImmovablesService {
  async findAll(): Promise<Immovable[]> {
    return Immovable.findAll();
  }
}