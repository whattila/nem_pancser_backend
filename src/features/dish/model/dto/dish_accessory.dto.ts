import { Expose, Transform } from "class-transformer";

export class DishAccessoryDto {
    @Expose()
    @Transform(({ obj }) => obj._id?.toString())
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    price!: number;
}