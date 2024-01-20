import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RentService } from './rent.service';
import { CreateRentDto } from './dto/create-rent.dto';

@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

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
  create(@Body() createRentDto: CreateRentDto) {
    return this.rentService.create(createRentDto).catch((e) => {
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

  @Get('count/now')
  countNow() {
    return this.rentService.countNow().catch((e) => {
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
