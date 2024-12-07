import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document

@Schema() 
export class Product {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ default: 0 })
  price: number

  @Prop({ default: 0 })
  quantity: number

  @Prop({ required: true })
  imageUrl: string

  @Prop({ default: () => new Date })
  createdAt: Date

  @Prop({ default: null })
  updatedAt: Date
}

export const ProductSchema = SchemaFactory.createForClass(Product)