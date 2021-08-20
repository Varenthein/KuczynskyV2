import { IsString, IsNotEmpty, IsNotEmptyObject, IsMongoId } from 'class-validator'

export class CreateImageBodyDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsMongoId()
  @IsNotEmpty()
  category: string
}

export class CreateImageFileDto {
  @IsNotEmptyObject()
  file: Express.Multer.File
}
