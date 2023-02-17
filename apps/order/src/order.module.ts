import {Module, OnModuleInit} from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import {MongoModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {Order, OrderSchema} from "./order.schema";
import {ConfigModule} from "@nestjs/config";
import {OrderRepository} from "./order.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/order/.env',
    }),
      MongoModule,
      MongooseModule.forFeature([{name: 'orders', schema: OrderSchema}]),
      ConfigModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule implements OnModuleInit{
  onModuleInit(): any {
    console.log(`Init Module Order`)
  }

}
