import { BadRequestException } from '@nestjs/common';

export class WrongFileExtensionException extends BadRequestException {
  constructor(allowedFormats: string[]) {
    super(`File format is invalid... You should use: ${allowedFormats.join(', ')}`);
  }
}
