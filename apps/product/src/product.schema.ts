import {BaseSchema} from "@app/common/baseMongo/base.schema";
import {Prop, SchemaFactory, Schema as _Schema} from "@nestjs/mongoose";
import {Schema} from "mongoose";
@_Schema({versionKey: false})
export class Product extends BaseSchema{
  @Prop({type: Schema.Types.String})
  name: string

  @Prop({type: Schema.Types.String})
  description: string

  @Prop({type: Schema.Types.Array})
  image: string[]

  @Prop({type: Schema.Types.Number})
  price: number

  @Prop({type: Schema.Types.Number})
  quantity: number

}

export const ProductSchema = SchemaFactory.createForClass(Product)


