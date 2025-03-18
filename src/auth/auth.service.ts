import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, password: string) {
    // https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
    // https://github.com/Michallesss/PrintAPI/blob/main/src/auth/auth.service.ts
  }

  // async signUp(email: string, password: string) {}
}
