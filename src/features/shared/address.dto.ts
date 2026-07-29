import { IsAlpha, IsOptional, IsString } from "class-validator";

export class AddressDto {
  @IsAlpha()
  city!: string;

  @IsString()
  place!: string;

  @IsString()
  number!: string;

  @IsOptional()
  @IsString()
  staircase?: string;

  @IsOptional()
  @IsString()
  floor?: string;

  @IsOptional()
  @IsString()
  door?: string;

  @IsOptional()
  @IsString()
  bell?: string;
}