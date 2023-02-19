import {BaseRepository} from "@app/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "./user.schema";

export class UserRepository extends BaseRepository<User>{
  constructor(
      @InjectModel('users') user: Model<User>
  ) {
    super(user)
  }
}
