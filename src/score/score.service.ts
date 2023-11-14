import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Score } from 'src/shared/models';
import { UpdateScoreDto } from './dto/update-score.dto';
import { CreateScoreDto } from './dto/create-score.dto';

@Injectable()
export class ScoreService {
  constructor(
    @InjectModel(Score)
    private scoreModel: typeof Score,
  ) {}

  findAll() {
    return this.scoreModel.findAll().catch((e) => {
      throw new InternalServerErrorException(
        'Error obteniendo las publicaciones de la DB',
      );
    });
  }

  findPost(postId: string) {
    // Get scores by postId from the database on sequelize
    return this.scoreModel.findAll({ where: { postId: postId } }).catch((e) => {
      throw new InternalServerErrorException(
        'Error obteniendo las publicaciones de la DB por postId',
      );
    });
  }

  create(createScoreDto: CreateScoreDto) {
    return this.scoreModel.create({ ...createScoreDto }).catch((e) => {
      throw new InternalServerErrorException('Error creando el Score en la DB');
    });
  }

  async update(id: string, updateScoreDto: UpdateScoreDto) {
    const score = await this.scoreModel.findByPk(id).catch((e) => {
      throw new InternalServerErrorException(
        'Error obteniendo el Score de la DB',
      );
    });
    // updatedAt == createdAt => Score is new
    const creationTime = new Date(score.updatedAt).getTime();
    const currentTime = new Date().getTime();
    const maxTime = 24 * 60 * 60 * 1000;
    // Not modifiable after 24hs of creation
    if (currentTime - creationTime > maxTime) {
      throw new BadRequestException(
        'No se puede modificar el Score después de 24hs de su creación',
      );
    }
    
    if (score.updatedAt !== score.createdAt) {
      let updateTime = new Date(score.updatedAt).getTime();
      if (currentTime - updateTime > maxTime / 12) {
        throw new BadRequestException(
          'No modificable pasadas 2hs de su edición',
        );
      }
    }
    // Update the score
    return score.update(updateScoreDto).catch((e) => {
      throw new InternalServerErrorException(
        'Error actualizando el Score en la DB',
      );
    });
  }
}
