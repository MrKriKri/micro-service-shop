import { Controller, Inject } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderRequestDto } from './dto/create-order.request.dto';
import {FilterQuery} from "mongoose";
import {Order} from "./order.schema";
import { ClientTCP, MessagePattern } from '@nestjs/microservices';


@Controller()
export class OrderController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientTCP,
    private readonly orderService: OrderService
  ) {}

  @MessagePattern({cmd: 'createOrder'})
  async createOrderController(payload: CreateOrderRequestDto){
    const orderCreated = await this.orderService.createOrder(payload);
    this.productService.emit('createOrder', orderCreated)
    return orderCreated
  }

  @MessagePattern({cmd: 'getOrder'})
  async getOrderController(query: FilterQuery<Order>){
    return await this.orderService.findOrder(query)
  }

  @MessagePattern({cmd: 'cancelOrder'})
  async cancelOrderController({id}: {id: string}){
    const orderCancelled = await this.orderService.cancelOrder(id)
    this.productService.emit('cancelOrder', orderCancelled)
    return orderCancelled
  }
}
