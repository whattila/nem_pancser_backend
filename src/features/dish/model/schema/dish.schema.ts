import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { DishCategory } from "./dish_category.schema";

export type DishDocument = HydratedDocument<Dish>;

@Schema({
    collection: "dishes",
    timestamps: true
})
export class Dish {
    @Prop({ required: true })
    name!: string;

    @Prop({
        type: Types.ObjectId,
        ref: DishCategory.name,
        required: true,
    })
    categoryId!: Types.ObjectId;

    @Prop({ required: true })
    price!: number;

    @Prop({ required: true })
    description!: string;

    @Prop({
        type: [String],
        default: undefined,
    })
    allergens?: string[];

    @Prop()
    pancserCredit?: number;

    @Prop({ required: true })
    imageUrl!: string;
}

export const DishSchema = SchemaFactory.createForClass(Dish);