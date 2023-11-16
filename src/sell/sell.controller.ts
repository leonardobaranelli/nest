import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SellService } from './sell.service';
import { CreateSellDto } from './dto/create-sell.dto';

@Controller('sell')
export class SellController {
  constructor(private readonly rentService: SellService) {}

  @Get()
  findAll() {
    return this.rentService.findAll().catch((e) => {
      throw e;
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentService.findOne(id).catch((e) => {
      throw e;
    });
  }

  @Post()
  create(@Body() createSellDto: CreateSellDto) {
    return this.rentService.create(createSellDto).catch((e) => {
      throw e;
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentService.remove(id).catch((e) => {
      throw e;
    });
  }

  @Get('count')
  count() {
    return this.rentService.count().catch((e) => {
      throw e;
    });
  }

  @Get('amount')
  amount() {
    return this.rentService.amount().catch((e) => {
      throw e;
    });
  }
}
