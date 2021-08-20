import { Controller, Get, Post, Body, UseInterceptors, UploadedFiles, SerializeOptions } from '@nestjs/common'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { ProductsService } from './products.service'
import { CreateProductBodyDto, CreateProductFilesDto } from './dto/create-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @SerializeOptions({
    excludePrefixes: ['_'],
  })
  findAll() {
    return this.productsService.findAll()
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]))
  async createPost(@Body() productBody: CreateProductBodyDto, @UploadedFiles() productFiles: CreateProductFilesDto) {
    return this.productsService.create(productBody, productFiles)
  }
}
