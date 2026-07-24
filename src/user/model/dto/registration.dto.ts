import { IsAlphanumeric, IsBoolean, IsEmail, IsObject, IsPhoneNumber, IsString, IsStrongPassword, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';
import { Type } from 'class-transformer';

export class RegistrationDto {
  @IsAlphanumeric()
  username!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;

  @IsString()
  familyName!: string;

  @IsString()
  givenName!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsBoolean()
  subscribeToNewsletter!: boolean;

  @ValidateNested()
  @Type(() => AddressDto)
  address!: AddressDto;
}