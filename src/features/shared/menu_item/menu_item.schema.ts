import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { DishCategory } from "../../dish/model/schema/dish_category.schema";
import { DishAccessoryType } from "src/features/dish/model/enum/dish_accessory_type";

@Schema({
    collection: "menu_items",
    timestamps: true
})
export class MenuItem {
    @Prop({ required: true })
    name!: string;

    @Prop({
        type: [Types.ObjectId],
        ref: DishCategory.name,
    })
    dishCategories?: Types.ObjectId[];

    @Prop({
        type: String,
        enum: DishAccessoryType
    })
    dishAccessoryType?: DishAccessoryType;

    @Prop()
    pizzaPropertyType?: string;

    @Prop()
    imageUrl?: string;

    @Prop()
    description?: string;

    @Prop({
        type: [String],
        default: undefined,
    })
    allergens?: string[];

    @Prop()
    hasSideDishOption?: boolean;

    @Prop()
    hasMeatOption?: boolean;

    @Prop()
    hasSaladExtraOption?: boolean;

    @Prop({ required: true })
    price?: number;

    @Prop()
    isAvailableWithPancserCredit?: boolean;

    @Prop()
    pancserCreditValue?: number;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);