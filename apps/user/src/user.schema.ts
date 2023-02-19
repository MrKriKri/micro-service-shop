import {BaseSchema} from "@app/common/baseMongo/base.schema";
import {Prop, SchemaFactory, Schema as _Schema} from "@nestjs/mongoose";
import {Schema} from "mongoose";
@_Schema({versionKey: false})
export class User extends BaseSchema{
  @Prop({type: Schema.Types.String})
  name: string

  @Prop({type: Schema.Types.String})
  username: string

  @Prop({type: Schema.Types.String})
  email: string

}

export const UserSchema = SchemaFactory.createForClass(User)


