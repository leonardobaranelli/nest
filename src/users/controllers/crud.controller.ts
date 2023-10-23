import { Controller, Get } from '@nestjs/common';
import { User } from '../user.model';
import { UsersService } from '../services/crud.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  getUsers(): Promise<User[] | { error: string; }> {
    return this.usersService.getUsers();
  }  
}