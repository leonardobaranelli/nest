import { Table, Column, Model, PrimaryKey, DataType, Default, AllowNull } from 'sequelize-typescript';

enum userType {
  ADMIN = 'ADMIN',
  USER = 'USER'
} 

@Table
export class User extends Model {
  @PrimaryKey  
  @AllowNull(false)
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })  
  id: string;

  // @Column({allowNull: false, type: DataType.STRING(255)})
  // type: userType;

  @Column({
    type: DataType.STRING, // O el tipo de datos correcto para la columna 'type'
    allowNull: false,
  })
  //type: string;

  @Column({allowNull: false, type: DataType.STRING(255)})
  email: string;

  @Column({ allowNull:false, type: DataType.STRING(255) })  
  username: string;

  // @Column({ allowNull:false, type: DataType.STRING(255) })  
  // lastName: string;

  @Column({ allowNull:false, type: DataType.STRING(255) })  
  password: string;

  // @Column({unique: true})
  // phone: string;

  // @Column({ allowNull:false, type: DataType.STRING })  
  // identificationNumber: string;
  

}