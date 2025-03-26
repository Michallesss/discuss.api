import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email: email });

    if (!user) throw new NotFoundException('Email or password is incorrect');
    if (user.password !== pass) throw new NotFoundException('Email or password is incorrect');

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string): Promise<{ access_token: string }> {
    const foundUser = await this.usersService.findOne({ email: email });

    if (foundUser) throw new ConflictException('User already exists');

    
    const user = await this.usersService.create({ email, password });
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getProfile(id: number) {
    const user = await this.usersService.findOne({ id: id });
    if (!user) throw new NotFoundException('User not found');

    const { password, ...result } = user;
    return result;
  }
}
