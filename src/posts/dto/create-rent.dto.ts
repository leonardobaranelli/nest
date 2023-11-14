import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRentDto {
  // Data Transfer Object (DTO) for creating a post || Posts

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  guests: number;

  @IsNotEmpty()
  @IsString()
  postId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
