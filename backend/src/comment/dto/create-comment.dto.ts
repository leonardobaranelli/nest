import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @MaxLength(1000)
  comment: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsUUID()
  postId: string;
}
