import { Table, Column, Model, PrimaryKey, DataType, Default, AllowNull } from 'sequelize-typescript';

enum postType {
  SELL = 'SELL',
  RENT = 'RENT'
}

@Table
export class Posts extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })  
  id: string;  

  @Column({type: DataType.INTEGER})
  days: number;

  @Column({allowNull: false, type: DataType.STRING(255)})
  type: postType;

  @Column({ allowNull:false })  
  image: string;

  @Column({ allowNull:false, type: DataType.STRING(255) })  
  title: string;

  @Column({ allowNull:false, unique: true, type: DataType.STRING })  
  country: string;

  @Column({allowNull: false, unique: true, type: DataType.STRING})
  city: string;

  @Column({allowNull: false, type: DataType.STRING})
  streetName: string;

  @Column({allowNull: false, type: DataType.STRING})
  streetNumber: string;

  @Column({ type: DataType.STRING })  
  floorNumber: string;

  @Column({ type: DataType.STRING })  
  aptNumber: string;

  @Column({ type: DataType.INTEGER })  
  price: number;
  
  @Column({ allowNull: false, type: DataType.STRING(1000)})  
  description: string;

}