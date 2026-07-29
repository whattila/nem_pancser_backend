import { IsAlphanumeric, IsBoolean, IsEmail, IsPhoneNumber, IsString, IsStrongPassword, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from 'src/features/shared/address.dto';

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