import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UsePipes, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { ZodValidationPipe } from 'src/zod.pipe';
import { loginSchema, loginType, registerSchema, registerType } from './schemas/auth.schemas';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  // u can create global Public decorator https://docs.nestjs.com/security/authentication#enable-authentication-globally
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  signIn(@Body() body: loginType) {
    return this.authService.signIn(body.email, body.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  signUp(@Body() body: registerType) {
    return this.authService.signUp(body.email, body.password);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
