import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Address, AddressSchema } from './address.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  _id?: Types.ObjectId;

  @Prop({
    required: true,
    unique: true
  })
  email!: string;

  @Prop({ required: true })
  familyName!: string;

  @Prop({ required: true })
  givenName!: string;

  @Prop({
    required: true,
    unique: true
  })
  username!: string;

  @Prop({ required: true })
  phoneNumber!: string;

  @Prop({
    required: true,
    type: AddressSchema
  })
  address!: Address;

  @Prop({ required: true })
  passwordHash!: string;

  @Prop({ required: true })
  subscribeToNewsletter!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);