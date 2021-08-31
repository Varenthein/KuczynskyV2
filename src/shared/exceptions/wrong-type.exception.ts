import { BadRequestException } from '@nestjs/common';

export class WrongTypeException extends BadRequestException {
  constructor(expectedType: string, receivedType: string) {
    super(`Type is invalid. Expected ${expectedType}, received ${receivedType}`);
  }
}
