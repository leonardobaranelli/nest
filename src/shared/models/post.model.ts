import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User, Comment, Score, Rent } from '.';

enum postType {
  SELL = 'SELL',
  RENT = 'RENT',
}

@Table
export class Post extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.INTEGER })
  days: number;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  type: postType;

  @Column({ allowNull: false })
  image: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  title: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  country: string;

  @Column({ allowNull: false, unique: true, type: DataType.STRING })
  city: string;

  @Column({ allowNull: false, type: DataType.STRING })
  streetName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  streetNumber: string;

  @Column({ type: DataType.STRING })
  floorNumber: string;

  @Column({ type: DataType.STRING })
  aptNumber: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @Column({ allowNull: false, type: DataType.STRING(1000) })
  description: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.UUID })
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Score)
  scores: Score[];

  @HasMany(() => Rent) //Rent === Reservation !IMPORTANT -> Change the name of the model
  rents: Rent[];
}
