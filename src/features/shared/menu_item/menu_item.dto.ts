import { Expose, Transform } from "class-transformer";

export abstract class MenuItemDto {
    @Expose()
    @Transform(({ obj }) => obj._id?.toString())
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    imageUrl?: string;

    @Expose()
    description?: string;
}