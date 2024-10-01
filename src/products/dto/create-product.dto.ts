import { IsNumber, IsString, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {

    @IsString()
    @MinLength(3)
    @MaxLength(255)
    name: string;
  
    @IsNumber()
    @Min(0)
    price: number;
  
    @IsString()
    description: string;

}
