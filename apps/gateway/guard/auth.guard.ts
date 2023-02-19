import {CanActivate, ExecutionContext, Inject, Injectable, Scope} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import {AuthService} from "../src/auth/auth.service";
import {ClientTCP} from "@nestjs/microservices";
import {lastValueFrom} from "rxjs";
import {User} from "../../user/src/user.schema";

@Injectable({ scope: Scope.REQUEST })
export class AuthGuard implements CanActivate {
  constructor(
      @Inject('USER_SERVICE')
      private readonly userService: ClientTCP,
      private readonly jwtService: JwtService,
      private reflector: Reflector,
      private readonly authService: AuthService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const [type, token] =
    context.switchToHttp().getRequest().headers?.authorization?.split(' ') || [];
    if (token) {
      const decodedToken = this.jwtService.decode(token) as any;
      let user = await lastValueFrom(this.userService.send<User>({cmd: 'getMe'}, {id: decodedToken._id}))
      console.log(decodedToken)
      this.authService.setUser({ id: user._id.toString(), username: user.username, email: user.email });
      return true;
    } else {
      return false;
    }
  }
}
