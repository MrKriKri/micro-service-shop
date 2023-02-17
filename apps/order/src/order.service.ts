import { Injectable } from '@nestjs/common';
import {OrderRepository} from "./order.repository";
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";
import {FilterQuery, Types} from "mongoose";
import {Order} from "./order.schema";
import {OrderStatus} from "./util.type";

@Injectable()
export class OrderService {
  constructor(
      private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(payload: CreateOrderRequestDto){
    const fakeProduct = [
        {name: 'shirt', price: 100, quantity: 10},
        {name: 'hat', price: 50, quantity: 2}
    ]
    const fakeCustomer = {
      name: 'customer number 1',
      userName: 'number1',
    }
    const total = fakeProduct.reduce((previousValue, currentValue)=> (previousValue+currentValue.price) , 0)
    const netTotal = total - payload.discount
    return await this.orderRepository.create({...payload, product: fakeProduct, total, netTotal, customer: fakeCustomer, status: OrderStatus.PENDING})
  }

  async findOrder(query: FilterQuery<Order>){
    return await this.orderRepository.find(query)
  }

  async cancelOrder(id: string){
    return await this.orderRepository.findAndUpdateOne({_id: new Types.ObjectId(id)}, {status: OrderStatus.CANCELLED})
  }
}
