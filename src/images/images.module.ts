import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ImagesController } from './images.controller'
import { ImagesService } from './images.service'
import { Image, ImageSchema } from './image.schema'
import { ImagesRepository } from './images.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],
  controllers: [ImagesController],
  providers: [ImagesService, ImagesRepository],
  exports: [ImagesService]
})

export class ImagesModule {}
