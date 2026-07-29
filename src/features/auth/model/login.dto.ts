import { IsAlphanumeric, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsAlphanumeric()
  username!: string;

  @IsStrongPassword()
  password!: string;
}