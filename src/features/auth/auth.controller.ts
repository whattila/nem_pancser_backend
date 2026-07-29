import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { LoginDto } from "./model/login.dto";
import { RegistrationDto } from "./model/registration.dto";
import { AuthService } from "./auth.service";
import { Public } from "../../auth_guard/public.decorator";

@Public()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return await this.authService.register(registrationDto);
  }
}