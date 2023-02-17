import {BaseSchema} from "@app/common/baseMongo/base.schema";
import {Prop, SchemaFactory, Schema as _Schema} from "@nestjs/mongoose";
import {Schema} from "mongoose";
@_Schema({versionKey: false})
export class Order extends BaseSchema{
  @Prop({type: Schema.Types.String})
  ref: string

  @Prop({type: Schema.Types.Array})
  product: {[key: string]: any}[]

  @Prop({type: Schema.Types.Map})
  customer: {[key: string]: any}

  @Prop({type: Schema.Types.Number})
  total: number

  @Prop({type: Schema.Types.Number})
  discount: number

  @Prop({type: Schema.Types.Number})
  netTotal: number

  @Prop({type: Schema.Types.String})
  status: string

}

export const OrderSchema = SchemaFactory.createForClass(Order)


