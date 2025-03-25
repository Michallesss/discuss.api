import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne({ email: email });

    if (!user) throw new NotFoundException('Email or password is incorrect');
    if (user.password !== pass) throw new NotFoundException('Email or password is incorrect');

    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
    return result;
  }

  async signUp(email: string, password: string) {
    const user = await this.usersService.findOne({ email: email });

    if (user) throw new ConflictException('User already exists');

    // TODO: Generate a JWT and return it here
    // instead of the user object
    return this.usersService.create({ email, password });
  }
}
