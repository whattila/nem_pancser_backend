import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { LoginDto } from "./model/dto/login.dto";
import { RegistrationDto } from "./model/dto/registration.dto";

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.userService.login(loginDto);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    return await this.userService.register(registrationDto);
  }
}