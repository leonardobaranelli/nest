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
  timestamps: false,
})
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING, defaultValue: 'user' })
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

  @Column({ unique: true, allowNull: true, type: DataType.BIGINT }) //sin esto no se puede publicar una propiedad ni hacer una reserva
  personalId: number;

  @DeletedAt // si un usuario se quiere eliminar lo eliminamos pero aun va a permanecer en la base de datos para mantener un registro
  deletedAt: Date; //se rellenará automáticamente con la fecha en la que se elimina un registro.

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Score)
  scores: Score[];

  @HasMany(() => Rent) //Rent === Reservation !IMPORTANT -> Change the name of the model
  rents: Rent[];

  @BelongsToMany(() => Post, ()=> Favorite)
  favorites: Favorite[];
  /* favorites: Array<User & {Favorite: Favorite}> */
}
