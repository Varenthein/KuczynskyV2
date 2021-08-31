import { Injectable } from '@nestjs/common'
import { ReadImageDto } from './dto/read-image.dto'
import { CreateImageBodyDto, CreateImageFileDto } from './dto/create-image.dto'
import { ImagesRepository } from './images.repository'
import { CategoriesService } from 'src/categories/categories.service'
import { DocumentDoesNotExistException } from 'src/shared/exceptions/document-not-exist.exception'

@Injectable()
export class ImagesService {

  constructor(
    private readonly imagesRepository: ImagesRepository,
    private readonly categoriesService: CategoriesService) {}

  async findAll(): Promise<ReadImageDto[]> {
    return await this.imagesRepository.findAll();
  }

  async create(imageData: CreateImageBodyDto, { file }: CreateImageFileDto): Promise<ReadImageDto> {
    // validate if category exists
    if(!this.categoriesService.exists({ id: imageData.category }))
      throw new DocumentDoesNotExistException('categories')

    return await this.imagesRepository.create({ ...imageData, src: file.originalname });
  }

}
