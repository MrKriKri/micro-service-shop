import {IsEmail, IsString} from "class-validator";

export class RegisterRequestDto{
  @IsString()
  name: string

  @IsEmail()
  email: string

  @IsString()
  username: string
}
