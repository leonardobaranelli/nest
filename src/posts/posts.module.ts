import { Module } from '@nestjs/common';
import { CrudService } from './services/crud.service';
import { CrudController } from './controller/crud.controller';

@Module({
  providers: [CrudService],
  controllers: [CrudController],  
})
export class PostsModule {}
