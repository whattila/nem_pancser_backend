import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Address {
  @Prop({ required: true })
  city!: string;

  @Prop({ required: true })
  place!: string;
  
  @Prop({ required: true })
  number!: string;
  
  @Prop()
  staircase?: string;
  
  @Prop()
  floor?: string;
  
  @Prop()
  door?: string;

  @Prop()
  bell?: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);