import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): any {
    return {
      name: 'Discuss.it',
      version: '0.1.0',
      description: null,
    };
  }
}
