import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EntityRepository } from 'src/shared/database/entity.repository';
import { Product, ProductDocument } from './product.schema'

@Injectable()
export class ProductsRepository extends EntityRepository<ProductDocument, Product> {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<ProductDocument>) {
    super(productModel)
  }
}
