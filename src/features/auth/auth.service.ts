import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import config from '../../config/keys';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './model/login.dto';
import * as bcrypt from 'bcrypt';
import { RegistrationDto } from './model/registration.dto';
import { Address } from '../shared/address.schema';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';

const saltRounds = config.bcryptSaltRounds;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findByUserName(loginDto.username);
    if (!user)
      throw new NotFoundException('Felhasználó nem létezik');

    const passwordsMatch = await bcrypt.compare(loginDto.password, user.passwordHash);
    if (!passwordsMatch)
      throw new UnauthorizedException('A megadott jelszó hibás, próbálja újra, vagy kérjen új jelszót!');

    const payload = { username: user.username, sub: user._id!.toString() };
    return {
      id: user._id!.toString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registrationDto: RegistrationDto) {
    const address = new Address();
    address.city = registrationDto.address.city;
    address.place = registrationDto.address.place;
    address.number = registrationDto.address.number;
    address.staircase = registrationDto.address.staircase;
    address.floor = registrationDto.address.floor;
    address.door = registrationDto.address.door;
    address.bell = registrationDto.address.bell;

    const passwordHash = await bcrypt.hash(registrationDto.password, saltRounds);

    const newUser = new User();
    newUser.familyName = registrationDto.familyName;
    newUser.givenName = registrationDto.givenName;
    newUser.email = registrationDto.email;
    newUser.username = registrationDto.username;
    newUser.phoneNumber = registrationDto.phoneNumber;
    newUser.address = address;
    newUser.passwordHash = passwordHash;
    newUser.subscribeToNewsletter = registrationDto.subscribeToNewsletter;

    const createdUser = await this.userService.createUser(newUser);
    
    const payload = { username: createdUser.username, sub: createdUser._id!.toString() };
    return {
      id: createdUser._id!.toString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}