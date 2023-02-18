import {BaseRepository} from "@app/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Product} from "./product.schema";

export class ProductRepository extends BaseRepository<Product>{
  constructor(
      @InjectModel('products') product: Model<Product>
  ) {
    super(product)
  }
}
