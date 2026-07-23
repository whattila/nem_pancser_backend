import {
  ConflictException,
  HttpException,
  HttpStatus,
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
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
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
      throw new HttpException('Hiba történt a felhasználó létrehozása során.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
