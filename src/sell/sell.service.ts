import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sell } from 'src/shared/models/sell.model';
import { CreateSellDto } from './dto/create-sell.dto';

@Injectable()
export class SellService {
  constructor(
    @InjectModel(Sell)
    private sellModel: typeof Sell,
  ) {}

  create(createSellDto: CreateSellDto) {
    return this.sellModel.create({ ...createSellDto }).catch((e) => {
      throw new InternalServerErrorException('Error creando la Venta');
    });
  }

  async remove(id: string): Promise<string> {
    return this.sellModel.destroy({ where: { id } }).then(() => id);
  }

  findAll() {
    return this.sellModel.findAll().catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Ventas');
    });
  }

  findOne(id: string) {
    return this.sellModel.findByPk(id).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo la Venta');
    });
  }

  count() {
    return this.sellModel.count().catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Ventas');
    });
  }

  amount() {
    // Get a sum of the amount of all Rents
    return this.sellModel.sum('amount').catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Ventas');
    });
  }
}
