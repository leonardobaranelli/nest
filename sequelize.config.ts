import { Sequelize } from 'sequelize-typescript';
import { Immovable } from './src/immovables/immovable.model';
import { User } from './src/users/user.model';

export const sequelize = new Sequelize({
  database: 'nest',
  dialect: 'postgres',
  username: 'postgres',
  password: 'admin',
  models: [Immovable, User],
});
