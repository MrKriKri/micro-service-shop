import {Controller} from '@nestjs/common';
import { UserService } from './user.service';
import {FilterQuery} from "mongoose";
import {User} from "./user.schema";
import {RegisterRequestDto} from "./dto/register.request.dto";
import {MessagePattern} from "@nestjs/microservices"

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern({cmd: 'register'})
  async register(payload: RegisterRequestDto){
    return await this.userService.createUser(payload)
  }

  @MessagePattern({cmd: 'getUser'})
  async getUser(query: FilterQuery<User>){
    return await this.userService.getUser(query)
  }

  @MessagePattern({cmd: 'getMe'})
  async getMe(id: string){
    return await this.userService.getMe(id)
  }
}
