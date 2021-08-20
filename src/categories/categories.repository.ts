import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EntityRepository } from 'src/database/entity.repository';
import { Category, CategoryDocument } from './category.schema'

@Injectable()
export class CategoriesRepository extends EntityRepository<CategoryDocument, Category> {
  constructor(@InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>) {
    super(categoryModel)
  }
}
