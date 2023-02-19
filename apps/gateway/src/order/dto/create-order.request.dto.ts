import {IsNumber, IsArray, IsString} from "class-validator";

export class CreateOrderRequestDto{
  @IsString()
  ref: string

  @IsArray()
  product: { id: string, quantity: number}[]

  @IsNumber()
  discount: number

  @IsString()
  customer: string

}
