import { IsString, IsArray, IsNotEmpty, IsObject, IsNumber } from 'class-validator'
import { Image } from '../../images/image.schema'

export class ReadProductDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsArray()
  @IsNotEmpty()
  details: string[]

  @IsObject()
  @IsNotEmpty()
  thumbnail: Image

  @IsNumber()
  @IsNotEmpty()
  priority: number

  @IsObject()
  @IsNotEmpty()
  image: Image
}

export default ReadProductDto;
