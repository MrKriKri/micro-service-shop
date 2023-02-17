import {Types, Schema} from "mongoose";
import {Prop} from "@nestjs/mongoose";

export class BaseSchema {
  @Prop({type: Schema.Types.ObjectId})
  _id: Types.ObjectId

  @Prop({type: Schema.Types.Date})
  createdAt: Date

  @Prop({type: Schema.Types.Date})
  updatedAt: Date
}
