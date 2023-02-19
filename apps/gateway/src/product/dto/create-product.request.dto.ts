import {IsArray, IsNumber, IsString} from "class-validator";

export class CreateProductRequestDto{
  @IsString()
  name: string

  @IsNumber()
  price: number

  @IsNumber()
  quantity: number

  @IsString()
  description: string

  @IsArray()
  image: string[]
}
