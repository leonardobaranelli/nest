import { Module } from '@nestjs/common';
import { UsersController } from './controllers/crud.controller';
import { UsersService } from './services/crud.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

