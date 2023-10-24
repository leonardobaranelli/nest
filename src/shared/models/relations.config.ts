import { Sequelize } from 'sequelize-typescript';
import { Post } from './post.model';
import { User } from './user.model';
import { Rent } from './rent.model';
import { Comment } from './comment.model';
import { Score } from './score.model';

// Crear una nueva instancia de Sequelize
export const sequelize = new Sequelize({
  // Configuración de la base de datos (puedes agregar tus detalles aquí)
});

// Definir las relaciones
User.hasMany(Post, { foreignKey: 'id' });
Post.belongsTo(User, { foreignKey: 'id' });

User.hasMany(Score, { foreignKey: 'id' });
Score.belongsTo(User, { foreignKey: 'id' });

Post.hasMany(Comment, { foreignKey: 'id' });
Comment.belongsTo(Post, { foreignKey: 'id' });

Post.hasMany(Score, { foreignKey: 'id' });
Score.belongsTo(Post, { foreignKey: 'id' });

Post.hasMany(Rent, { foreignKey: 'id' });
Rent.belongsTo(Post, { foreignKey: 'id' });


// Agregar modelos a la instancia de Sequelize
sequelize.addModels([User, Post, Rent, Comment, Score]);

// Exportar la instancia de Sequelize
export { User, Post, Rent, Comment, Score };