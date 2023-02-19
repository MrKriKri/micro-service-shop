import {Body, Controller, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import {CreateProductRequestDto} from "./dto/create-product.request.dto";
import {FilterQuery} from "mongoose";
import {ClientTCP, MessagePattern} from "@nestjs/microservices";
import {Product} from "./dto/product.dto";

@Controller('product')
export class ProductController {
  constructor(@Inject('PRODUCT_SERVICE')private readonly productService: ClientTCP) {}

  @Post()
  async createProduct(@Body() payload: CreateProductRequestDto){
    return await this.productService.send({cmd: 'createProduct'},payload)
  }

  @Get()
  async getProduct(@Query() query: FilterQuery<Product>){
    return this.productService.send({cmd: 'getProduct'}, query);
  }

  @Put(':id')
  async updateProduct(@Param() {id: _id}: {id: string}, @Body() payload: Omit<Product, '_id'|'updatedAt'>){
    return this.productService.send({cmd: 'updateProduct'}, {_id, ...payload});
  }

  @Get('/:id')
  async getOneProduct(@Param() {id: _id}: {id: string}){
    return this.productService.send({cmd: 'getOneProduct'}, {_id});
  }

}
