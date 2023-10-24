import { IsString, IsNumber } from 'class-validator';

export class UpdateImmovableDto {
    @IsString()
    readonly type?: string;
  
    @IsString()
    readonly address?: string;
  
    @IsNumber()
    readonly price?: number;
  
    @IsString()
    readonly condition?: string; 
  }
  