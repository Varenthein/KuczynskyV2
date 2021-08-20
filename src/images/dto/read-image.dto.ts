import { IsString, IsNotEmpty, IsObject, IsMongoId } from 'class-validator'
import { Category } from 'src/categories/category.schema'

export class ReadImageDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  src: string

  @IsObject()
  @IsNotEmpty()
  category: Category
}

export default ReadImageDto;
