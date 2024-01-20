import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSellDto {
  // Data Transfer Object (DTO) for creating a Rent
  @IsNotEmpty()
  @IsString()
  readonly soldDate: string;

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
