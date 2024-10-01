import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDto {

    @IsNotEmpty()
    @IsString()
    products: string

    @IsNotEmpty()
    @IsNumber()
    totalPrice: number


    @IsArray()
    @IsNotEmpty()
    productIds: Array<number>
}
