import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'
import { Image } from '../images/image.schema'

export type ProductDocument = Product & mongoose.Document

@Schema()
export class Product {
  @Prop({ required: true })
  title: string

  @Prop({ required: true })
  details: string[]

  @Prop({ required: true })
  priority: number

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', autopopulate: true })
  thumbnail: Image

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Image', autopopulate: true })
  image: Image
}

export const ProductSchema = SchemaFactory.createForClass(Product);
