import { Module } from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../../guard/jwt.stratergy";
import {JwtAuthGuard} from "../../guard/jwt-auth.guard";
import {constant} from "../constant";

@Module({
  imports: [
    JwtModule.register({
      secret: constant.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
