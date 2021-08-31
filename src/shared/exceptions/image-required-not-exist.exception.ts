import { BadRequestException } from '@nestjs/common';

export class ImageRequiredNotExistException extends BadRequestException {
  constructor() {
    super('Image is required, but does not exist');
  }
}
