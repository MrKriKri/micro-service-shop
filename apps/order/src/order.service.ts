import { Inject, Injectable } from '@nestjs/common';
import {OrderRepository} from "./order.repository";
import {CreateOrderRequestDto} from "./dto/create-order.request.dto";
import {FilterQuery, Types} from "mongoose";
import {Order} from "./order.schema";
import {OrderStatus} from "./util.type";
import { ClientTCP } from '@nestjs/microservices';
import { Product } from '../../product/src/product.schema';
import { lastValueFrom } from 'rxjs';
import { User } from '../../user/src/user.schema';

@Injectable()
export class OrderService {
  constructor(
      @Inject('USER_SERVICE') private readonly userService: ClientTCP,
      @Inject('PRODUCT_SERVICE') private readonly productService: ClientTCP,
      private readonly orderRepository: OrderRepository
  ) {}

  async createOrder(payload: CreateOrderRequestDto){
    const product = await Promise.all(
        payload.product.map(async (_product) =>
        {
          return  {
          ..._product,
          product: await lastValueFrom(
              this.productService.send<Product>({cmd: 'getOneProduct'}, {_id: _product.id})
          )}
        }
        )
    )
    const customer = await lastValueFrom(this.userService.send<User>({cmd: 'getMe'}, {id: payload.customer}))
    const total = product.reduce((previousValue, currentValue)=> (previousValue+currentValue.product.price) , 0)
    const netTotal = total - payload.discount
    return await this.orderRepository.create({...payload, product: product, total, netTotal, customer, status: OrderStatus.PENDING})
  }

  async findOrder(query: FilterQuery<Order>){
    return await this.orderRepository.find(query)
  }

  async cancelOrder(id: string){
    return await this.orderRepository.findAndUpdateOne({_id: new Types.ObjectId(id)}, {status: OrderStatus.CANCELLED})
  }
}
