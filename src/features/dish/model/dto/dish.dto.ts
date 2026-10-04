import { Expose } from "class-transformer";
import { MenuItemDto } from "src/features/shared/menu_item/menu_item.dto";

export class DishDto extends MenuItemDto {
    @Expose()
    price!: number;

    @Expose()
    pancserCreditValue?: number;

    @Expose()
    allergens?: string[];

    @Expose()
    hasSideDishOption?: boolean;

    @Expose()
    hasMeatOption?: boolean;

    @Expose()
    hasSaladExtraOption?: boolean;
}