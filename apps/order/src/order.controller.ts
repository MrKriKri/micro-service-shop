import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import { OrderService } from './order.service';
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";
import {FilterQuery, Types, Schema} from "mongoose";
import {Order} from "./order.schema";


@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrderController(@Body() payload: CreateOrderRequestDto){
    return await this.orderService.createOrder(payload);
  }

  @Get()
  async getOrderController(@Query() query: FilterQuery<Order>){
    return await this.orderService.findOrder(query)
  }

  @Put('cancel/:id')
  async cancelOrderController(@Param() {id}: {id: string}){
    return await this.orderService.cancelOrder(id)
  }
}
