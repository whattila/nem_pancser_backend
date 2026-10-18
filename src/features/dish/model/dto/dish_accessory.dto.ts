import { Expose, Transform } from "class-transformer";
import { DishAccessoryType } from "../enum/dish_accessory_type";

export class DishAccessoryDto {
    @Expose()
    @Transform(({ obj }) => obj._id?.toString())
    id!: string;

    @Expose()
    name!: string;

    @Expose()
    @Transform(
        ({ obj }) => obj.boatType,
        { toClassOnly: true },
    )
    type!: DishAccessoryType;

    @Expose()
    price!: number;
}