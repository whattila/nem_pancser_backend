import { Expose, Transform } from "class-transformer";

export class DishCategoryDto {
  @Expose()
  @Transform(({ obj }) => obj._id?.toString())
  id!: string;

  @Expose()
  name!: string;
}