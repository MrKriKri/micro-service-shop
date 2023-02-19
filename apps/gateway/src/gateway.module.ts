import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {UserController} from "./user/user.controller";
import {ProductController} from "./product/product.controller";
import {OrderController} from "./order/order.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3003 },
      },
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: { port: 3001 },
      },
    ]),
  ],
  controllers: [GatewayController, UserController, ProductController, OrderController],
  providers: [GatewayService],
})
export class GatewayModule {}
