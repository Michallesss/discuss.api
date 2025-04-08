import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  private readonly saltRounds = 10;

  async signIn(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne({ email: email });

    if (!user) throw new NotFoundException('Email or password is incorrect');
    if (!await bcrypt.compare(password, user.password)) throw new NotFoundException('Email or password is incorrect');

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, password: string): Promise<{ access_token: string }> {
    const foundUser = await this.usersService.findOne({ email: email });
    if (foundUser) throw new ConflictException('User already exists');
    
    const user = await this.usersService.create({ email, password: await bcrypt.hash(password, this.saltRounds) });
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
