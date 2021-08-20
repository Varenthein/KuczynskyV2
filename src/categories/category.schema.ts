import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type CategoryDocument = Category & mongoose.Document

@Schema()
export class Category {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string

  @Prop({ required: true })
  title: string

  @Prop({ type: mongoose.Schema.Types.ObjectId })
  relatedProduct: string
}

export const CategorySchema = SchemaFactory.createForClass(Category);
