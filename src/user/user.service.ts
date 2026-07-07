import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import config from '../config/keys';
import { RegistrationDto } from './model/dto/registration.dto';
import { LoginDto } from './model/dto/login.dto';
import { Address } from './model/schema/address.schema';
import { User, UserDocument } from './model/schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';

const saltRounds = config.bcryptSaltRounds;

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.findByUserName(loginDto.username);
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

  async register(registration: RegistrationDto) {
    const address = new Address();
    address.city = registration.address.city;
    address.place = registration.address.place;
    address.number = registration.address.number;
    address.staircase = registration.address.staircase;
    address.floor = registration.address.floor;
    address.door = registration.address.door;

    const passwordHash = await bcrypt.hash(registration.password, saltRounds);

    const newUser = new User();
    newUser.familyName = registration.familyName;
    newUser.givenName = registration.givenName;
    newUser.email = registration.email;
    newUser.username = registration.username;
    newUser.phoneNumber = registration.phoneNumber;
    newUser.address = address;
    newUser.passwordHash = passwordHash;

    const createdUser = await this.createUser(newUser);
    
    const payload = { username: createdUser.username, sub: createdUser._id!.toString() };
    return {
      id: createdUser._id!.toString(),
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async findByUserName(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username }).lean();
  }

  private async createUser(user: User): Promise<User> {
    try {
      return await new this.userModel(user).save();
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        if (error.keyPattern?.email)
          throw new ConflictException('Ez az e-mail cím már használatban van.');
        if (error.keyPattern?.username)
          throw new ConflictException('Ez a felhasználónév már használatban van.');
      }
      throw new HttpException('Hiba történt a felhasználó létrehozása során.', 500);
    }
  }
}
