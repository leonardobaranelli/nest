import { Sequelize } from 'sequelize-typescript';
import { Posts } from './posts.model';
import { User } from './user.model';
import { Rent } from './rent.model';
import { Comment } from './comment.model';
import { Score } from './score.model';
import { config } from 'dotenv';

config();

export const sequelize = new Sequelize({
  dialect: 'postgres',
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  models: [Posts, User, Rent, Comment, Score],
});

User.hasMany(Posts, { foreignKey: 'userId' });
Posts.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Score, { foreignKey: 'userId' });
Score.belongsTo(User, { foreignKey: 'userId' });

Posts.hasMany(Comment, { foreignKey: 'postsId' });
Comment.belongsTo(Posts, { foreignKey: 'postsId' });

Posts.hasMany(Score, { foreignKey: 'postsId' });
Score.belongsTo(Posts, { foreignKey: 'postsId' });

Posts.hasMany(Rent, { foreignKey: 'postsId' });
Rent.belongsTo(Posts, { foreignKey: 'postsId' });

sequelize.addModels([User, Posts, Rent, Comment, Score]);

export { User, Posts, Rent, Comment, Score };
