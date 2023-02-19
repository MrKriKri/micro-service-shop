import {Body, Controller, Get, Inject, Param, Post, Put, Query, UseGuards} from '@nestjs/common';
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";
import {FilterQuery} from "mongoose";
import {Order} from "./dto/order.dto";
import {ClientTCP} from "@nestjs/microservices";
import {AuthGuard} from "../../guard/auth.guard";


@Controller('order')
export class OrderController {
  constructor(@Inject('ORDER_SERVICE')private readonly orderService: ClientTCP) {}

  @Post()
  @UseGuards(AuthGuard)
  async createOrderController(@Body() payload: CreateOrderRequestDto){
    return this.orderService.send({cmd: 'createOrder'}, payload);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getOrderController(@Query() query: FilterQuery<Order>){
    return this.orderService.send({cmd: 'getOrder'}, query);
  }

  @Put('cancel/:id')
  @UseGuards(AuthGuard)
  async cancelOrderController(@Param() {id}: {id: string}){
    return this.orderService.send({cmd: 'cancelOrder'}, {id});
  }
}
