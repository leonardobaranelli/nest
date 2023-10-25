import { sequelize } from './shared/models/relations.config'
import { Posts } from './shared/models/relations.config'
import { User } from './shared/models/relations.config'
import { Rent } from './shared/models/relations.config'
import { Comment } from './shared/models/relations.config'
import { Score } from './shared/models/relations.config'

async function createTestRecords() {  
  await sequelize.sync();
 
  await User.create({
    // id: '4a',
    email: 'anonymous@example.com',
    username: 'testuser',
    password: 'testpassword',
    type: 'admin',
    lastName: 'test',
    phone: 'test',
    identificationNumber: "string",
  });
}

createTestRecords().then(() => {
  console.log('Test records created successfully');
  process.exit(0);
}).catch(error => {
  console.error('Error creating test records', error);
  process.exit(1);
});