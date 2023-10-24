import { sequelize } from '../sequelize.config';
import { Post } from './shared/models/relations.config'
import { User } from './shared/models/relations.config'
import { Rent } from './shared/models/relations.config'
import { Comment } from './shared/models/relations.config'
import { Score } from './shared/models/relations.config'

async function createTestRecords() {  
  await sequelize.sync();
 
  await User.create({
    // id: '4a',
    email: 'test@example.com',
    username: 'testuser',
    password: 'testpassword',
    type: 'admin',
    lastName: 'test',
    phone: 'test',
    identificationNumber: "string",
  });
}

createTestRecords().then(() => {
  console.log('Registros de prueba creados con éxito.');
  process.exit(0);
}).catch(error => {
  console.error('Error al crear registros de prueba:', error);
  process.exit(1);
});