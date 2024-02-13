import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from '../shared/models';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  create(createCommentDto: CreateCommentDto) {
    return this.commentModel.create({ ...createCommentDto }).catch((e) => {
      throw new InternalServerErrorException('Error creando Comentario');
    });
  }

  remove(id: string) {
    return this.commentModel.destroy({ where: { id } }).catch((e) => {
      throw new InternalServerErrorException('Error eliminando Comentario');
    });
  }

  fromPost(postId: string) {
    return this.commentModel.findAll({ where: { postId } }).catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Comentarios');
    });
  }

  count() {
    return this.commentModel.count().catch((e) => {
      throw new InternalServerErrorException('Error obteniendo Comentarios');
    });
  }
}
