import {Prop} from "@nestjs/mongoose";

export interface Product{
  _id: string

  createdAt: Date

  updatedAt: Date

  name: string

  description: string

  image: string[]

  price: number

  quantity: number

}
