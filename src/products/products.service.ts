import { Injectable } from '@nestjs/common'
import { ReadProductDto } from './dto/read-product.dto'
import { CreateProductBodyDto, CreateProductFilesDto } from './dto/create-product.dto'
import { ProductsRepository } from './products.repository'
import { CategoriesService } from 'src/categories/categories.service'
import * as mongoose from 'mongoose'
import { ImagesService } from 'src/images/images.service'
import { flattenUploadedFiles } from 'src/utils/flattenUploadedFiles.helper'

@Injectable()
export class ProductsService {

  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly categoriesService: CategoriesService,
    private readonly imagesService: ImagesService) {}

  async findAll(): Promise<ReadProductDto[]> {
    return await this.productsRepository.findAll();
  }

  private async getCurrentHighestPriorityLevel(): Promise<number> {
    const product = await this.productsRepository.findOneWithHighest('priority')
    return product?.priority || 1
  }

  async create(productBody: CreateProductBodyDto, productFiles: CreateProductFilesDto): Promise<ReadProductDto> {

    // prepare _id for new product
    const productId = new mongoose.mongo.ObjectId()

    // create image category for new product
    const productCategory = await this.categoriesService.create({ title: productBody.title, relatedProduct: productId })

    // productFiles is object with arrays with files { thumbnail: [file], ...}, let's flatten it
    const {
      image: imageFile,
      thumbnail: thumbnailFile
    } = flattenUploadedFiles({ ...productFiles })

    // upload thumbnail and image for the product
    const productImage = await this.imagesService.create({
      title: `${productBody.title} product image`,
      category: productCategory.id
    }, {
      file: imageFile
    })

    const productThumbnail = await this.imagesService.create({
      title: `${productBody.title} product thumbnail`,
      category: productCategory.id
    }, {
      file: thumbnailFile
    })

    // get the current highest priority level
    const productPriority = await this.getCurrentHighestPriorityLevel() + 1

    // prepare and add new product to DB
    const newProduct = {
      _id: productId,
      image: productImage.id,
      thumbnail: productThumbnail.id,
      priority: productPriority,
      ...productBody
    }

    return await this.productsRepository.create(newProduct);
  }

}
