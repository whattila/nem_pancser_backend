import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type DishCategoryDocument = HydratedDocument<DishCategory>;

@Schema({
    collection: "dish_categories",
    timestamps: true
})
export class DishCategory {
    @Prop({ 
        required: true,
        unique: true
    })
    name!: string;
}

export const DishCategorySchema = SchemaFactory.createForClass(DishCategory);