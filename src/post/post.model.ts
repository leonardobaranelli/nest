import { Table, Column, Model, PrimaryKey, DataType, Default, AllowNull } from 'sequelize-typescript';

@Table
export class Post extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column({ type: DataType.UUID, allowNull: false })
  id: string;

  @Column({ type: DataType.STRING(255) })
  type: string;

  @Column({ type: DataType.STRING(255) })
  address: string;

  @Column({ type: DataType.INTEGER }) 
  price: number;

  @Column({ type: DataType.DATE })
  createdAt: Date;
}