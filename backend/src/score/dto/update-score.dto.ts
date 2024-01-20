import { IsUUID, IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateScoreDto {
  @IsOptional()
  @IsString()
  readonly type: string;

  @IsOptional()
  @IsInt()
  readonly score: number;

  @IsOptional()
  @IsString()
  readonly feedBack: string;

  @IsOptional()
  @IsUUID()
  readonly userId: string;

  @IsOptional()
  @IsUUID()
  readonly postId: string;
}
