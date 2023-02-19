import {Controller} from '@nestjs/common';
import { ProductService } from './product.service';
import {CreateProductRequestDto} from "./dto/create-product.request.dto";
import {FilterQuery} from "mongoose";
import {Product} from "./product.schema";
import {MessagePattern, EventPattern} from '@nestjs/microservices'

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({cmd: 'createProduct'})
  async createProduct(payload: CreateProductRequestDto){
    return await this.productService.createProduct(payload)
  }

  @MessagePattern({cmd: 'getProduct'})
  async getProduct(query: FilterQuery<Product>){
    return await this.productService.getProduct(query)
  }

  @MessagePattern({cmd: 'getOneProduct'})
  async getOneProduct(query: FilterQuery<Product>){
    return await this.productService.getProduct(query)
  }

  @MessagePattern({cmd: 'updateProduct'})
  async updateProduct(payload: Omit<Product, 'updatedAt'>){
    return await this.productService.updateProduct(payload._id.toString() , payload)
  }

  @EventPattern('createOrder')
  async createOrder(payload: {id: string, product: {id: string, quantity: number}[]}){
    return await Promise.all(payload.product.map(async (product) => await this.productService.soldProduct(product.id, product.quantity)))
  }

  @EventPattern('cancelOrder')
  async cancelOrder(payload: {id: string, product: {id: string, quantity: number}[]}){
    return await Promise.all(payload.product.map(async (product) => await this.productService.cancelOrder(product.id, product.quantity)))
  }
}
