import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {ConfigModule} from "@nestjs/config";
import {MongoModule} from "@app/common";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.schema";
import {UserRepository} from "./user.repository";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/user/.env',
    }),
    MongoModule,
    MongooseModule.forFeature([{name: 'users', schema: UserSchema}]),
    ConfigModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
