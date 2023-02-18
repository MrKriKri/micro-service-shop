import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { ProductService } from './product.service';
import {CreateProductRequestDto} from "./dto/create-product.request.dto";
import {FilterQuery} from "mongoose";
import {Product} from "./product.schema";

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() payload: CreateProductRequestDto){
    return await this.productService.createProduct(payload)
  }

  @Get()
  async getProduct(@Query() query: FilterQuery<Product>){
    return await this.productService.getProduct(query)
  }

  @Put(':id')
  async updateProduct(@Param() {id}: {id: string}, @Body() payload: Omit<Product, '_id'|'updatedAt'>){
    return await this.productService.updateProduct(id, payload)
  }

  @Post('createOrder')
  async createOrder(@Param() {id}: {id: string},@Body() payload: {id: string, quantity: number}[]){
    return await Promise.all(payload.map(async (product) => await this.productService.soldProduct(product.id, product.quantity)))
  }

  @Post('cancelOrder')
  async cancelOrder(@Param() {id}: {id: string},@Body() payload: {id: string, quantity: number}[]){
    return await Promise.all(payload.map(async (product) => await this.productService.cancelOrder(product.id, product.quantity)))
  }
}
