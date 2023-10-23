import { Module } from '@nestjs/common';
import { CrudController } from './controllers/crud.controller';
import { CrudService } from './services/crud.service';

@Module({
  controllers: [CrudController],
  providers: [CrudService]
})
export class UsersModule {}

