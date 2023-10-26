import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  AllowNull,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User, Post } from '.';

enum scoreType {
  CLIENT = 'CLIENT',
  OWNER = 'OWNER',
  POST = 'POST',
}

@Table({ 
  tableName: 'scores',
  timestamps: false
})
export class Score extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  type: scoreType;

  @Column({ allowNull: false, type: DataType.INTEGER })
  score: number;

  @Column({ allowNull: false, unique: true, type: DataType.STRING(1000) })
  feedBack: string;

  @ForeignKey(() => User)
  @Column({ allowNull: true, type: DataType.UUID })
  userId: string;

  @ForeignKey(() => Post)
  @Column({ allowNull: true, type: DataType.UUID })
  postId: string;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  posts: Post;
}
