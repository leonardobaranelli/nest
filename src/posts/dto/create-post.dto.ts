import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()  
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number; 

  @IsNotEmpty()
  @IsString()
  readonly condition: string; 
}