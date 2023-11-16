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
  tableName: 'sell',
  timestamps: false,
})
export class Sell extends Model {
  @Column({ allowNull: false, type: DataType.STRING })
  soldDate: string;

  @Column({ allowNull: false, type: DataType.REAL })
  amount: number;

  @ForeignKey(() => Post)
  @Column({ allowNull: false, type: DataType.UUID })
  postId: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.UUID })
  userId: string;

  @BelongsTo(() => Post)
  post: Post;

  @BelongsTo(() => User)
  user: User;
}
