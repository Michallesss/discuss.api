// TODO 
// https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
// https://100lvlmaster.medium.com/seeding-nestjs-with-prisma-and-faker-af6a36a3954d
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, email: 'johndoe@interia.pl', password: 'itakniebedziedzialac' },
  ];
  
  async findOne(email: string): Promise<any | undefined> {
    return this.users.find(user => user.email === email);
  }
}
