import { sequelize } from '../sequelize.config';
import { Immovable } from './immovables/immovable.model';
import { User } from './users/user.model';

async function createTestRecords() {  
  await sequelize.sync();

  await Immovable.create({
    type: 'Casa',
    address: 'Calle Principal 123',
    price: 250000,
    //createdAt: new Date('2023-10-20T14:00:00Z'),
  });

  await Immovable.create({
    type: 'Apartamento',
    address: 'Avenida Secundaria 456',
    price: 90000,
    //createdAt: new Date('2023-10-20T14:30:00Z'),
  });
  
  await User.create({
    email: 'test@example.com',
    username: 'testuser',
    password: 'testpassword',
  });
}

createTestRecords().then(() => {
  console.log('Registros de prueba creados con éxito.');
  process.exit(0);
}).catch(error => {
  console.error('Error al crear registros de prueba:', error);
  process.exit(1);
});