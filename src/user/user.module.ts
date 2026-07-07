import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./model/schema/user.schema";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { JwtModule } from "@nestjs/jwt";
import config from '../config/keys';

const mongooseModule = [
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
];

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
      signOptions: { expiresIn: '1d' },
    }),
    ...mongooseModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}