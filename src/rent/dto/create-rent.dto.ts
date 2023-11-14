import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateRentDto {
  // Data Transfer Object (DTO) for creating a Rent
  @IsNotEmpty()
  @IsString()
  readonly startDate: string;

  @IsNotEmpty()
  @IsString()
  readonly endDate: string;

  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsNotEmpty()
  @IsString()
  readonly postId: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
