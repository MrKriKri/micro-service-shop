import {BaseRepository} from "@app/common";
import {Order} from "./order.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

export class OrderRepository extends BaseRepository<Order>{
  constructor(
      @InjectModel('orders') order: Model<Order>
  ) {
    super(order)
  }
}
