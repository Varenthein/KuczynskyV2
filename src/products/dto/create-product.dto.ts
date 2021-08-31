import { IsString, IsArray, IsNotEmpty, ArrayMinSize, ArrayMaxSize } from 'class-validator'

export class CreateProductBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsArray()
  details: string[]
}

export class CreateProductFilesDto {
  @IsArray()
  @ArrayMaxSize(1)
  thumbnail: Express.Multer.File[]

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(1)
  image: Express.Multer.File[]
}
