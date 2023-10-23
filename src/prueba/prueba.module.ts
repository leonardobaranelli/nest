import { Module } from '@nestjs/common';
import { Prueba2Module } from './prueba2/prueba2.module';

@Module({
  imports: [Prueba2Module]
})
export class PruebaModule {}
