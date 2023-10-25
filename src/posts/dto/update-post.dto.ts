import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from "./create-post.dto";
import { IsString, IsNumber } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    readonly type?: string;
  
    @IsString()
    readonly address?: string;
  
    @IsNumber()
    readonly price?: number;
  
    @IsString()
    readonly condition?: string; 
  }
  




