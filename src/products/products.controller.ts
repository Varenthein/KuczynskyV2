import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ProductsService } from './products.service'
import { FileValidatorService } from 'src/shared/services/file-validator.service'
import { CreateProductBodyDto, CreateProductFilesDto } from './dto/create-product.dto'
import { imageFileFilter } from 'src/shared/helpers/multer-image-filter.helper'

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly fileValidatorService: FileValidatorService) {}

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ],
      {
        fileFilter: imageFileFilter
      }
    )
  )
  async createPost(
    @Body() productBody: CreateProductBodyDto,
    @UploadedFiles() productFiles: CreateProductFilesDto) {
      this.fileValidatorService.isFilesArray(productFiles.image, { amount: 1 })
      this.fileValidatorService.isFilesArray(productFiles.thumbnail, { amount: 0 })
      return this.productsService.create(productBody, productFiles)
  }
}
