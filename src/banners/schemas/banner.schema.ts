import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document

@Schema() 
export class Banner {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string

  @Prop({ required: true, unique: true })
  displayOrder: number

  @Prop({ required: true })
  imageUrl: string

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: null })
  updatedAt: Date
}

export const BannerSchema = SchemaFactory.createForClass(Banner)