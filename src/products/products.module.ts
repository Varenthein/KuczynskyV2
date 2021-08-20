import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { Product, ProductSchema } from './product.schema'
import { ProductsRepository } from './products.repository'
import { CategoriesModule } from 'src/categories/categories.module'
import { ImagesModule } from 'src/images/images.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    CategoriesModule,
    ImagesModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})

export class ProductsModule {}
