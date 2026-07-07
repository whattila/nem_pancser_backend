import { IsAlpha, IsAlphanumeric, IsEmail, IsObject, IsPhoneNumber, IsStrongPassword, Length, Matches, ValidateNested } from 'class-validator';
import { AddressDto } from './address.dto';

export class RegistrationDto {
  @Length(3, 20)
  @IsAlphanumeric()
  username!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword()
  password!: string;

  @Length(2, 20)
  @Matches(/^\p{L}+(?:-\p{L}+)?$/u) // Accepts string with only letters and optional hyphenated second part, e.g. "Smith" or "Smith-Jones"
  familyName!: string;

  @Length(2, 15)
  @IsAlpha()
  givenName!: string;

  @IsPhoneNumber()
  phoneNumber!: string;

  @IsObject()
  @ValidateNested()
  address!: AddressDto;
}