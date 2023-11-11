import { 
    Table,
    Column, 
    Model, 
    PrimaryKey, 
    ForeignKey, 
    BelongsToMany, 
    DataType,
    AllowNull,
    HasMany,
} from 'sequelize-typescript'
import { User, Post } from '.'

export class Favorite extends Model {
    @PrimaryKey
    @Column ({ type: DataType.INTEGER,})
    id: number;

    @ForeignKey(()=> User)
    @Column({ allowNull: true, type: DataType.UUID})
    userId: string;
    
   @ForeignKey(()=> Post)
   @Column ({ allowNull: true, type: DataType.UUID})
   postId: string;
   
   @BelongsToMany(()=> User, {
    through: 'userFavorites',
  })
   user: User;

   @BelongsToMany(()=> Post, {
    through: 'userFavorites',
  })
   post: Post;


}