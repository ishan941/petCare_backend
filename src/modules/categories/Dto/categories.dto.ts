import { IsInt, IsOptional, IsString } from "class-validator";

export class CategoriesDto{
    @IsOptional()
    @IsInt()
    id?: number;

    @IsOptional()
    @IsString()
    categoriesImage?: string;

    @IsOptional()
    @IsString()
    categoriesName?: string;

  
    

}