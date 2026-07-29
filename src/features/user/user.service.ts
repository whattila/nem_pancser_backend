import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoServerError } from 'mongodb';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findByUserName(username: string): Promise<User | null> {
    return this.userModel.findOne({ username: username }).lean();
  }

  async createUser(user: User): Promise<User> {
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
