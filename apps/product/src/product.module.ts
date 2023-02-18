import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import {ConfigModule} from "@nestjs/config";
import {MongoModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "./product.schema";
import {ProductRepository} from "./product.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/product/.env',
    }),
    MongoModule,
    MongooseModule.forFeature([{name: 'products', schema: ProductSchema}]),
    ConfigModule
  ],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
