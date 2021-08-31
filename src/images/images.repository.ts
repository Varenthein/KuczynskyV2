import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EntityRepository } from 'src/shared/database/entity.repository';
import { Image, ImageDocument } from './image.schema'

@Injectable()
export class ImagesRepository extends EntityRepository<ImageDocument, Image> {
  constructor(@InjectModel(Image.name) private readonly imageModel: Model<ImageDocument>) {
    super(imageModel)
  }
}
