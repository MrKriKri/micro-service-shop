import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import { UserService } from './user.service';
import {FilterQuery} from "mongoose";
import {User} from "./user.schema";
import {RegisterRequestDto} from "./dto/register.request.dto";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() payload: RegisterRequestDto){
    return await this.userService.createUser(payload)
  }

  @Get()
  async getUser(@Query() query: FilterQuery<User>){
    return await this.userService.getUser(query)
  }

  @Get('/me')
  async getMe(){
    return await this.userService.getMe(`63f1a4819ca6d9a2ce8f3315`)
  }
}
