import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../shared/models';
import { Op } from 'sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    // Create a new user on the database on sequelize
    return this.userModel.create({ ...createUserDto }).catch((e) => {
      throw new InternalServerErrorException('Error creando el usuario');
    });
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    // Update a user from the database on sequelize
    return this.userModel
      .update(updateUserDto, {
        where: { id },
      })
      .catch((e) => {
        throw new InternalServerErrorException('Error actualizando Usuario');
      })
      .then((user) => {
        if (user[0] === 0) return 'Usuario no encontrado o no actualizado';
        return 'Usuario actualizado correctamente';
      });
  }

  async remove(id: string) {
    // Delete a user from the database on sequelize
    const user = await this.userModel
      .findOne({
        where: { id },
        paranoid: false,
      })
      .catch((e) => {
        throw new InternalServerErrorException('Error obteniendo usuario');
      })
      .then((user) => {
        if (!user) {
          throw new NotFoundException('Usuario no encontrado');
        }
        return user;
      });

    await user.destroy().catch((e) => {
      throw new InternalServerErrorException('Error eliminando usuario');
    });

    return 'Borradado correctamente';
  }

  findAll() {
    // Get all users from the database on sequelize
    return this.userModel.findAll({ paranoid: false }).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Usuarios');
    });
  }

  findOne(id: string) {
    // Get a detail of a user from the database on sequelize
    return this.userModel.findOne({ where: { id } }).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Usuario');
    });
  }

  findOneByEmail(email: string) {
    // verify if the user exists in the database
    return this.userModel.findOne({ where: { email } }).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Usuario');
    });
  }

  count() {
    // Get the total of users from the database on sequelize
    return this.userModel.count({ paranoid: false }).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Usuarios');
    });
  }

  countBanned() {
    // Get the deleted users from the database on sequelize
    return this.userModel
      .count({
        paranoid: false,
        where: { deletedAt: { [Op.ne]: null } },
      })
      .catch((e) => {
        throw new InternalServerErrorException('Error obteniendo Usuarios');
      });
  }
}
