import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post, Rent } from '../shared/models';
import { CreatePostDto } from './dto/create-post.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

export interface PostWithScore extends Post {
  score: number;
}

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post)
    private postsModel: typeof Post,
    @InjectModel(Rent)
    private rentModel: typeof Rent,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private postsWithScore(posts: Post[]): PostWithScore[] {
    const result = posts.map((post) => {
      // Calculate the average score for each post
      const scores = post.scores;
      let avrScore = 0;
      if (scores.length > 0) {
        avrScore =
          scores.reduce((acc, score) => acc + score.score, 0) / scores.length;
      }
      // Inject the average score into the post object && erase the scores property
      const { scores: _, ...postWithoutScores } = post.toJSON();
      return { ...postWithoutScores, score: avrScore };
    });
    // Wait for all promises to resolve
    return result;
  }

  filterByCondition(condition: string) {
    // Get posts by type from the database on sequelize
    return this.postsModel
      .findAll({
        where: { condition },
        include: ['scores'],
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Error obteniendo las publicaciones',
        );
      })
      .then((posts) => {
        return this.postsWithScore(posts);
      });
  }

  filterByCountry(country: string) {
    // Get post by country from the database on sequelize
    return this.postsModel
      .findAll({
        where: { country },
        include: ['scores'],
      })
      .then((posts) => {
        return this.postsWithScore(posts);
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Error obteniendo las publicaciones',
        );
      });
  }

  findAll() {
    // Get all posts from the database on sequelize
    return this.postsModel
      .findAll({
        // paranoid: false,
        include: ['scores'],
      })
      .then((posts) => {
        return this.postsWithScore(posts);
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Error obteniendo las publicaciones',
        );
      });
  }

  findOne(id: string) {
    // Get a detail of a post from the database on sequelize
    return this.postsModel
      .findOne({
        where: { id },
        include: ['scores'],
      })
      .then((post) => {
        return this.postsWithScore([post])[0];
      })
      .catch((e) => {
        throw new InternalServerErrorException('Error obteniendo los detalles');
      });
  }

  create(createPostDto: CreatePostDto) {
    // Add a new immovable to the database on sequelize
    return this.postsModel.create({ ...createPostDto }).catch((e) => {
      throw new InternalServerErrorException('Error al crear publicación');
    });
  }

  update(id: string, updatePostDto) {
    // Update a post from the database on sequelize
    return this.postsModel
      .update(updatePostDto, {
        where: { id },
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Error al actualizar publicación',
        );
      })
      .then(([post]) => {
        // Validate if the post updated
        console.log(post);
        if (post === 0)
          throw new BadRequestException(
            'Publicacion inexistente o sin cambios',
          );
        else return 'Publicacion actualizada correctamente';
      });
  }

  async remove(id: string) {
    // Find the post first
    const post =  await this.postsModel.findOne({ where: { id } });
    if(!post) {
      return { error: 'Post not found' };
    }
    // Soft delete the post
    await post.destroy();
    
    // Get the soft deleted post
    const deletedPost = await this.postsModel.findOne({ where: { id }, paranoid: false });
    
    if(deletedPost){
      console.log(deletedPost.deleteAt);
    } else {
      console.log('Post not found');
    }
    return "Deleted Successfully";
  }

  findAllRents() {
    return this.rentModel.findAll().catch((e) => {
      throw new InternalServerErrorException('Error obteniendo las Reservas');
    });
  }

  uploadFiles(files: Array<Express.Multer.File>): Promise<string[]> {
    const uploadPromises = files.map((file) =>
      this.cloudinaryService.uploadFile(file),
    );
    return Promise.all(uploadPromises)
      .then((results) => results.map(({ secure_url }) => secure_url))
      .catch((e) => {
        throw new BadRequestException(e.message);
      });
  }
}
