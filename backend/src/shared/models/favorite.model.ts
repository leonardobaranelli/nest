import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { User, Post } from '.';

@Table({
  tableName: 'favorites',
  timestamps: false,
})
export class Favorite extends Model {
  @ForeignKey(() => User)
  @Column({ allowNull: true, type: DataType.UUID })
  userId: string;

  @ForeignKey(() => Post)
  @Column({ allowNull: true, type: DataType.UUID })
  postId: string;

  @Column({ allowNull: false, type: DataType.ARRAY(DataType.STRING) })
  images: Array<string>;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  title: string;

  @Column({ type: DataType.INTEGER })
  price: number;

  @BelongsTo(() => Post)
  posts: Post;

  @BelongsTo(() => User)
  users: User;
}
