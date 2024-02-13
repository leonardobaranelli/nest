import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rent } from '../shared/models';
import { CreateRentDto } from './dto/create-rent.dto';

@Injectable()
export class RentService {
  constructor(
    @InjectModel(Rent)
    private rentModel: typeof Rent,
  ) {}

  private static readonly MS_PER_DAY = 1000 * 3600 * 24;
  private static readonly CREATION_LIMIT_DAYS = 3;
  private static readonly START_LIMIT_DAYS = 2;

  private daysSince(date: Date) {
    const currentDate = new Date();
    return Math.floor(
      (currentDate.getTime() - date.getTime()) / RentService.MS_PER_DAY,
    );
  }

  private daysUntil(date: Date) {
    const currentDate = new Date();
    return Math.floor(
      (date.getTime() - currentDate.getTime()) / RentService.MS_PER_DAY,
    );
  }

  create(createRentDto: CreateRentDto) {
    return this.rentModel.create({ ...createRentDto }).catch((e) => {
      throw new InternalServerErrorException('Error creando la Reserva');
    });
  }

  async remove(id: string): Promise<string> {
    const rent = await this.findOne(id).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo la Reserva');
    });
    const daysSinceCreation = this.daysSince(new Date(rent.createdAt));
    const daysUntilStart = this.daysUntil(new Date(rent.startDate));

    if (
      daysSinceCreation > RentService.CREATION_LIMIT_DAYS &&
      daysUntilStart >= RentService.START_LIMIT_DAYS
    ) {
      await rent.destroy().catch((e) => {
        throw new InternalServerErrorException('Error eliminando la Reserva');
      });
      return 'Reserva eliminada';
    }
    return 'No se puede eliminar la Reserva';
  }

  findAll() {
    return this.rentModel.findAll().catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Reservas');
    });
  }

  findOne(id: string) {
    return this.rentModel.findByPk(id).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo la Reserva');
    });
  }

  count() {
    return this.rentModel.count().catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Reservas');
    });
  }

  countNow() {
    // Get a count of Rents active now
    const currentDate = new Date();
    return this.rentModel
      .count({
        where: {
          startDate: { $lte: currentDate }, // $lte = less than or equal
          endDate: { $gte: currentDate }, // $gte = greater than or equal
        },
      })
      .catch((e) => {
        throw new InternalServerErrorException('Error obteniendo las Reservas');
      });
  }

  amount() {
    // Get a sum of the amount of all Rents
    return this.rentModel.sum('amount').catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Reservas');
    });
  }
}
