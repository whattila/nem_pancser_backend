import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Schema as MongooseSchema, Types } from "mongoose";
import { DishCategory } from "../../dish/model/schema/dish_category.schema";
import { DishAccessoryType } from "src/features/dish/model/enum/dish_accessory_type";
import { Allergen } from "src/features/dish/model/schema/allergen.schema";

@Schema({
    collection: "menu_items",
    timestamps: true
})
export class MenuItem {
    @Prop({ required: true })
    name!: string;

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: DishCategory.name,
        default: undefined
    })
    dishCategories?: Types.ObjectId[];

    @Prop({
        type: String,
        enum: DishAccessoryType
    })
    dishAccessoryType?: DishAccessoryType;

    @Prop() // TODO: use enum
    pizzaPropertyType?: string;

    @Prop()
    imageUrl?: string;

    @Prop()
    description?: string;

    @Prop({
        type: [MongooseSchema.Types.ObjectId],
        ref: Allergen.name,
        default: undefined
    })
    allergens?: Types.ObjectId[];

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