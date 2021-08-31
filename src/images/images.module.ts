import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'
import { Image, ImageSchema } from './image.schema'
import { ImagesRepository } from './images.repository'
import { CategoriesModule } from 'src/categories/categories.module'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
    CategoriesModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
  exports: [ImagesService]
})

export class ImagesModule {}
