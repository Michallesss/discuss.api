import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth/auth.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService/*, PrismaService*/], // Prisma service must be initialized with db at first
})
export class AppModule {}
