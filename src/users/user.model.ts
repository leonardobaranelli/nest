import { Table, Column, Model, PrimaryKey, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table
export class User extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @Column({ type: DataType.STRING(255) })  
  email: string;

  @Column({ type: DataType.STRING(255) })  
  username: string;

  @Column({ type: DataType.STRING(255) })  
  password: string;
}