import { Injectable } from '@nestjs/common'
import { ReadCategoryDto } from './dto/read-category.dto'
import { CreateCategoryDto } from './dto/create-category.dto'
import { CategoriesRepository } from './categories.repository'

@Injectable()
export class CategoriesService {

  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAll(): Promise<ReadCategoryDto[]> {
    return await this.categoriesRepository.findAll();
  }

  async create(categoryData: CreateCategoryDto): Promise<ReadCategoryDto> {
    return await this.categoriesRepository.create(categoryData);
  }

}
