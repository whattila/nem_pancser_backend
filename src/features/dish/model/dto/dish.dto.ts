import { Expose, Transform } from "class-transformer";

export class DishDto {
    @Expose()
    @Transform(({ obj }) => obj._id?.toString())
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    price!: number;

    @Expose()
    description!: string;

    @Expose()
    allergens?: string[];

    @Expose()
    pancserCredit?: number;

    @Expose()
    imageUrl!: string;
}