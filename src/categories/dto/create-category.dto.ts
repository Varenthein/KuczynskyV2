import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'
import * as mongoose from 'mongoose'

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsMongoId()
  relatedProduct: mongoose.Types.ObjectId
}
