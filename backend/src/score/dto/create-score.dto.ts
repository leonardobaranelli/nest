import { IsUUID, IsString, IsInt, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsString()
  readonly type: string;

  @IsInt()
  readonly score: number;

  @IsString()
  readonly feedBack: string;

  @IsOptional()
  @IsUUID()
  readonly userId: string;

  @IsOptional()
  @IsUUID()
  readonly postId: string;
}
