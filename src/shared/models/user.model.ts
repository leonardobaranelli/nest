import {
  Table,
  Column,
  Model,
  DeletedAt,
  PrimaryKey,
  DataType,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Post, Comment, Score, Rent, Favorite } from '.';

@Table({
  tableName: 'users',
  timestamps: true,
})
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user',
  })
  rol: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  username: string;

  @Column({ unique: true, allowNull: false, type: DataType.STRING(255) })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  password: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  firstName: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  lastName: string;

  @Column({ unique: true, allowNull: true, type: DataType.BIGINT })
  phone: number;

  @Column({ unique: true, allowNull: true, type: DataType.BIGINT })
  personalId: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  avatar_url: string;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
  isVerified: boolean;

  @DeletedAt
  deletedAt: Date;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Score)
  scores: Score[];

  @HasMany(() => Rent) //Rent === Reservation !IMPORTANT -> Change the name of the model
  rents: Rent[];

  @BelongsToMany(() => Post, () => Favorite)
  favorites: Favorite[];
}
