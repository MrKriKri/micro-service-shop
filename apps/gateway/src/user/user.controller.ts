import {Body, Controller, Get, Inject, Post, Query} from '@nestjs/common';
import {FilterQuery} from "mongoose";
import {RegisterRequestDto} from "./dto/register.request.dto";
import {ClientTCP} from "@nestjs/microservices";
import {User} from "./dto/user.dto";

@Controller(`user`)
export class UserController {
  constructor(
      @Inject('USER_SERVICE') private readonly userService: ClientTCP,
  ) {}

  @Post()
  async register(@Body() payload: RegisterRequestDto){
    return this.userService.send({cmd: 'register'}, payload);
  }

  @Get()
  async getUser(@Query() query: FilterQuery<User>){
    return this.userService.send({cmd: 'getUser'}, query);
  }

  @Get('/me')
  async getMe(){
    return this.userService.send({cmd: 'getMe'}, {id: '63f1a4819ca6d9a2ce8f3315'});
  }
}
