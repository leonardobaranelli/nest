import { Sequelize } from 'sequelize-typescript';
import { Post } from './src/post/post.model';
import { User } from './src/shared/models/user.model';
import { Rent } from './src/shared/models/rent.model';
import { Comment } from './src/shared/models/comment.model';
import { Score } from './src/shared/models/score.model';

export const sequelize = new Sequelize({
  database: 'nest',
  dialect: 'postgres',
  username: 'postgres',
  password: 'Planvallejo88',
  models: [Post, User, Rent, Comment, Score],
});
