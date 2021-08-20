import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Category } from '../categories/category.schema'

export type ImageDocument = Image & mongoose.Document

@Schema()
export class Image {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string

  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  src: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category
}

export const ImageSchema = SchemaFactory.createForClass(Image);
