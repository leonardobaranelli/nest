import { Module } from '@nestjs/common';
import { SellService } from './sell.service';
import { SellController } from './sell.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sell } from 'src/shared/models/sell.model';

@Module({
  imports: [SequelizeModule.forFeature([Sell])],
  controllers: [SellController],
  providers: [SellService],
  exports: [SellService],
})
export class SellModule {}
