import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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