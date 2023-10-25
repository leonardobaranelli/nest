import { Sequelize } from 'sequelize-typescript';
import { Posts } from './posts.model';
import { User } from './user.model';
import { Rent } from './rent.model';
import { Comment } from './comment.model';
import { Score } from './score.model';

export const sequelize = new Sequelize({
  database: 'nest', 
  dialect: 'postgres',
  username: 'postgres',
  password: 'admin',
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