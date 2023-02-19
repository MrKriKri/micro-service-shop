import {Body, Controller, Get, Inject, Param, Post, Query, UnauthorizedException, UseGuards} from '@nestjs/common';
import {FilterQuery} from "mongoose";
import {RegisterRequestDto} from "./dto/register.request.dto";
import {ClientTCP} from "@nestjs/microservices";
import {User} from "./dto/user.dto";
import {AuthGuard} from "../../guard/auth.guard";
import {lastValueFrom} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {constant} from "../constant";

@Controller(`user`)
export class UserController {
  constructor(
      @Inject('USER_SERVICE') private readonly userService: ClientTCP,
      private readonly jwtService: JwtService
  ) {}

  @Post()
  async register(@Body() payload: RegisterRequestDto){
    return this.userService.send({cmd: 'register'}, payload);
  }

  @Post('login')
  async login(@Body() {email}: {email: string}){
    const user = await lastValueFrom(this.userService.send<User>({cmd: 'getOne'}, {email}))
    if(user) return this.jwtService.sign(user, {secret: constant.secret});
    return new UnauthorizedException()
  }

  @Get()
  @UseGuards(AuthGuard)
  async getUser(@Query() query: FilterQuery<User>){
    return this.userService.send({cmd: 'getUser'}, query);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async getById(@Param() {id}: {id: string}){
    return this.userService.send({cmd: 'getMe'}, {id});
  }
}
