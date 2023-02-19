import { Injectable } from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {User} from "./user.schema";
import {FilterQuery, Types} from "mongoose";
import {RegisterRequestDto} from "./dto/register.request.dto";

@Injectable()
export class UserService {
  constructor(
      private readonly userRepository: UserRepository
  ) {}

  async createUser(payload: RegisterRequestDto){
    return await this.userRepository.create(payload)
  }

  async getUser(query: FilterQuery<User>){
    return await this.userRepository.find(query)
  }

  async getMe(id: string){
    return await this.userRepository.findOne({_id: new Types.ObjectId(id)})
  }
}
