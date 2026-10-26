import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    collection: "allergens",
    timestamps: true
})
export class Allergen {
    @Prop({ required: true })
    name!: string;
}

export const AllergenSchema = SchemaFactory.createForClass(Allergen);