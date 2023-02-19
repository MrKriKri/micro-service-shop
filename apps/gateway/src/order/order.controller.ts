import {Body, Controller, Get, Inject, Param, Post, Put, Query} from '@nestjs/common';
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";
import {FilterQuery} from "mongoose";
import {Order} from "./dto/order.dto";
import {ClientTCP} from "@nestjs/microservices";


@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE')private readonly orderService: ClientTCP) {}

  @Post()
  async createOrderController(@Body() payload: CreateOrderRequestDto){
    return this.orderService.send({cmd: 'createOrder'}, payload);
  }

  @Get()
  async getOrderController(@Query() query: FilterQuery<Order>){
    return this.orderService.send({cmd: 'getOrder'}, query);
  }

  @Put('cancel/:id')
  async cancelOrderController(@Param() {id}: {id: string}){
    return this.orderService.send({cmd: 'cancelOrder'}, {id});
  }
}
