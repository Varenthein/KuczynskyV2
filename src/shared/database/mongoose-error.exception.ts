import { BadRequestException } from '@nestjs/common';

export class MongooseErrorException extends BadRequestException {
  constructor(err: Error) {
    super(`Something went wrong while working with the database... `, err.stack);
  }
}
