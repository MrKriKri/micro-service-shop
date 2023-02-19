import { Injectable, Scope } from '@nestjs/common';

type User = { id: string; username: string; email: string };

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  private user: User;

  public getUser = (): User => this.user;
  public setUser = (user: User) => (this.user = user);
}
