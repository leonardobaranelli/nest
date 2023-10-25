import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Comment extends Model {
  @Column({ allowNull: false, type: DataType.STRING(1000) })
  comment: string;
}
