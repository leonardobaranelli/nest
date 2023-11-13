import { IsNotEmpty, IsString } from "class-validator";

export class CreateFavoriteDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    postId: string;
}
