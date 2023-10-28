import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRentDto {
  // Data Transfer Object (DTO) for creating a post || Posts

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
