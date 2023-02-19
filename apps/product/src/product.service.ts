import { Injectable } from '@nestjs/common';
import {ProductRepository} from "./product.repository";
import {FilterQuery, Types} from "mongoose";
import {Product} from "./product.schema";

@Injectable()
export class ProductService {
  constructor(
     private readonly productRepository: ProductRepository
  ) {}

  async createProduct(payload: any){
    return  await this.productRepository.create(payload)
  }

  async soldProduct(id: string, quantity: number){
    return  await this.productRepository.findAndUpdateOne({_id: new Types.ObjectId(id)}, {$inc: {quantity: quantity*-1}})
  }

  async cancelOrder(id: string, quantity: number){
    return  await this.productRepository.findAndUpdateOne({_id: new Types.ObjectId(id)}, {$inc: {quantity}})
  }

  async updateProduct(id: string, payload: Omit<Product, '_id'|'updatedAt'>){
    return await this.productRepository.findAndUpdateOne({_id: new Types.ObjectId(id)}, payload)
  }

  async getProduct(query: FilterQuery<Product>){
    return await this.productRepository.find(query)
  }

  async getOneProduct(query: FilterQuery<Product>){
    return await this.productRepository.findOne(query)
  }
}
