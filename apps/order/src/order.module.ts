import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MongoModule } from '@app/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';
import { ConfigModule } from '@nestjs/config';
import { OrderRepository } from './order.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/order/.env',
    }),
    ClientsModule.register([
      {name: 'PRODUCT_SERVICE', transport: Transport.TCP, options: {port: 3002} },
      {name: 'USER_SERVICE', transport: Transport.TCP, options: {port: 3003} }
    ]),
      MongoModule,
      MongooseModule.forFeature([{name: 'orders', schema: OrderSchema}]),
      ConfigModule
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
})
export class OrderModule {}
