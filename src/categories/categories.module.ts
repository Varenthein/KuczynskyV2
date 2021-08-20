import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CategoriesController } from './categories.controller'
import { CategoriesService } from './categories.service'
import { Category, CategorySchema } from './category.schema'
import { CategoriesRepository } from './categories.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }])],
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService]
})

export class CategoriesModule {}
