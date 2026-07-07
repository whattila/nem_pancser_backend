import { IsAlphanumeric, IsStrongPassword, Length } from 'class-validator';

export class LoginDto {
  @Length(3, 20)
  @IsAlphanumeric()
  username!: string;

  @IsStrongPassword()
  password!: string;
}