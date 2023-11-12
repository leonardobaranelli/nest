import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  BelongsTo
} from 'sequelize-typescript'
import { User, Post } from '.'

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

  @BelongsTo(() => Post)
  posts: Post;

  @BelongsTo(() => User)
  users: User;

}