import { IsAlpha, IsOptional, Length, Matches } from "class-validator";

export class AddressDto {
  @Length(2, 50)
  @IsAlpha()
  city!: string;

  @Length(3, 50)
  @Matches(/^(?=.*[\p{L}])[\p{L}\p{N}\-'\. ]+$/u) // Accepts string with letters, numbers, hyphens, apostrophes, periods, and spaces with at least one letter, e.g. "St. John's", "123 Main St.", "Smith-Jones"
  place!: string;

  @Length(1, 5)
  @Matches(/^\p{N}+\.?$/u) // Accepts string with only numbers and optional period, e.g. "123", "456."
  number!: string;

  @IsOptional()
  @Length(2, 20)
  staircase?: string;

  @IsOptional()
  @Length(2, 20)
  floor?: string;

  @IsOptional()
  @Length(2, 20)
  door?: string;
}