import { Module } from '@nestjs/common';
import { ImmovablesService } from './immovables.service';
import { ImmovablesController } from './immovables.controller';

@Module({
  providers: [ImmovablesService],
  controllers: [ImmovablesController]
})
export class ImmovablesModule {}
