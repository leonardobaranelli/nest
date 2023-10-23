import { Module } from '@nestjs/common';
import { ImmovablesService } from './services/crud.service';
import { ImmovablesController } from './controller/crud.controller';

@Module({
  providers: [ImmovablesService],
  controllers: [ImmovablesController]
})
export class ImmovablesModule {}
