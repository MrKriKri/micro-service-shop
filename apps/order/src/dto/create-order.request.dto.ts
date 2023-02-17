import {IsNumber, IsArray, IsString} from "class-validator";

export class CreateOrderRequestDto{
  @IsString()
  ref: string

  @IsArray()
  product: string[]

  @IsNumber()
  discount: number

}
