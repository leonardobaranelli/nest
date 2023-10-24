import { Sequelize } from 'sequelize-typescript';
import { Post } from './post.model';
import { User } from './user.model';
import { Rent } from './rent.model';
import { Comment } from './comment.model';
import { Score } from './score.model';

// Crear una nueva instancia de Sequelize
export const sequelize = new Sequelize({
  database: 'nest', 
  dialect: 'postgres',
  username: 'postgres',
  password: 'admin',
  models: [Post, User, Rent, Comment, Score],
});

// Definir las relaciones
User.hasMany(Post, { foreignKey: 'userid' });
Post.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Score, { foreignKey: 'userid' });
Score.belongsTo(User, { foreignKey: 'userid' });

Post.hasMany(Comment, { foreignKey: 'postid' });
Comment.belongsTo(Post, { foreignKey: 'postid' });

Post.hasMany(Score, { foreignKey: 'postid' });
Score.belongsTo(Post, { foreignKey: 'postid' });

Post.hasMany(Rent, { foreignKey: 'postid' });
Rent.belongsTo(Post, { foreignKey: 'postid' });


// Agregar modelos a la instancia de Sequelize
sequelize.addModels([User, Post, Rent, Comment, Score]);

// Exportar la instancia de Sequelize
export { User, Post, Rent, Comment, Score };