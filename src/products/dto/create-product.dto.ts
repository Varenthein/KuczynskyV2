import { IsString, IsArray, IsNotEmpty, IsNotEmptyObject, MinLength, MaxLength } from 'class-validator'

export class CreateProductBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsArray()
  @IsNotEmpty()
  details: string[]
}

export class CreateProductFilesDto {
  @IsNotEmptyObject()
  @MinLength(1)
  @MaxLength(1)
  thumbnail: Express.Multer.File[]

  @IsNotEmptyObject()
  @MinLength(1)
  @MaxLength(1)
  image: Express.Multer.File[]
}
