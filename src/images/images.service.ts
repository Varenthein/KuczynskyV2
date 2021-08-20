import { Injectable } from '@nestjs/common'
import { ReadImageDto } from './dto/read-image.dto'
import { CreateImageBodyDto, CreateImageFileDto } from './dto/create-image.dto'
import { ImagesRepository } from './images.repository'

@Injectable()
export class ImagesService {

  constructor(private readonly imagesRepository: ImagesRepository) {}

  async findAll(): Promise<ReadImageDto[]> {
    return await this.imagesRepository.findAll();
  }

  async create(imageData: CreateImageBodyDto, { file }: CreateImageFileDto): Promise<ReadImageDto> {
    console.log(file, { ...imageData, src: file.originalname })
    return await this.imagesRepository.create({ ...imageData, src: file.originalname });
  }

}
