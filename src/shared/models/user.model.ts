import { Table, Column, Model, PrimaryKey, DataType, Default, AllowNull } from 'sequelize-typescript';

enum userType {
  ADMIN = 'ADMIN',
  USER = 'USER'
} 

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column({allowNull: false, type: DataType.UUIDV4})
  id: string;

  @Column({allowNull: false, type: DataType.STRING(255)})
  type: userType

  @Column({allowNull: false, type: DataType.STRING(255)})
  email: string;

  @Column({ allowNull:false, type: DataType.STRING(255) })  
  username: string;

  @Column({ allowNull:false, type: DataType.STRING(255) })  
  lastName: string;

  @Column({ allowNull:false, type: DataType.STRING(255) })  
  password: string;

  @Column({unique: true})
  phone: string;

  @Column({ allowNull:false, type: DataType.STRING })  
  identificationNumber: string;

  

}