import { NotFoundException } from '@nestjs/common';

export class DocumentDoesNotExistException extends NotFoundException
{
  constructor(collectionName: string) {
    super(`The document from collection "${collectionName}" doesn't exist.`);
  }
}
