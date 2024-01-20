import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Post, User } from '.';

@Table({
  tableName: 'comments',
  timestamps: false,
})
export class Comment extends Model {
  @Column({ allowNull: false, type: DataType.STRING(1000) })
  comment: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.UUID })
  userId: string;

  @ForeignKey(() => Post)
  @Column({ allowNull: false, type: DataType.UUID })
  postId: string;

  @BelongsTo(() => Post)
  posts: Post;
}
