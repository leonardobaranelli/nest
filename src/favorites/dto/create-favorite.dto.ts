import { IsNotEmpty, IsNumber, IsString, isNotEmpty } from "class-validator";

export class CreateFavoriteDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    postId: string;
}
