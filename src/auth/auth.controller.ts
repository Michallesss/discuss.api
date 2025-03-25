import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/zod.pipe';
import { loginSchema, loginType, registerSchema, registerType } from './schemas/sign.schemas';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // Public decorator
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  signIn(@Body() body: loginType) {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(HttpStatus.CREATED)
  // Public decorator
  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  signUp(@Body() body: registerType) {
    return this.authService.signUp(body.email, body.password);
  }
}
