import { Table, Column, Model, DataType } from 'sequelize-typescript';


@Table
export class Rent extends Model {
 
  @Column({allowNull: false, type: DataType.STRING})
  startDate: string

  @Column({allowNull: false, type: DataType.STRING})
  endDate: string

}