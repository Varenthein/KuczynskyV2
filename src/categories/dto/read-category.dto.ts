import { IsString, IsNotEmpty, IsMongoId } from 'class-validator'

export class ReadCategoryDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  title: string

  @IsMongoId()
  relatedProduct: string
}

export default ReadCategoryDto;
