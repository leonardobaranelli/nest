import { IsOptional, MaxLength } from 'class-validator';

export class UpdateCommentDto {
  @IsOptional()
  @MaxLength(1000)
  comment?: string;
}
