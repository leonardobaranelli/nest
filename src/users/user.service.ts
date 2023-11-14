import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '../shared/models';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    // Create a new user on the database on sequelize
    return this.userModel.create({ ...createUserDto }).catch((e) => {
      throw new InternalServerErrorException(
        'Error creando el usuario en la DB',
      );
    });
  }

  findOneByEmail(email: string) {
    // verify if the user exists in the database
    return this.userModel.findOne({ where: { email } }).catch((e) => {
      throw new InternalServerErrorException(
        'Error obteniendo usuario de la DB',
      );
    });
  }

  findAll() {
    // Get all users from the database on sequelize
    return this.userModel.findAll({ paranoid: false }).catch((e) => {
      throw new InternalServerErrorException(
        'Error obteniendo usuarios de la DB',
      );
    });
  }

  findOne(id: string) {
    // Get a detail of a user from the database on sequelize
    return this.userModel.findOne({ where: { id } }).catch((e) => {
      throw new InternalServerErrorException(
        'Error obteniendo usuario de la DB',
      );
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // Update a user from the database on sequelize
    return this.userModel
      .update(updateUserDto, {
        where: { id },
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Error actualizando usuario en la DB',
        );
      })
      .then((user) => {
        if (user[0] === 0)
          throw new InternalServerErrorException(
            'Usuario no encontrado o no actualizado',
          );
        return 'Actualizado correctamente';
      });
  }

  async remove(id: string) {
    // Delete a user from the database on sequelize
    const user = await this.userModel
      .findOne({ where: { id } })
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
}
