import { BadRequestException } from '@nestjs/common';

export class ArrayChildrenWrongTypeException extends BadRequestException {
  constructor(expectedType: string, receivedType?: string) {
    super(`Array children format is invalid. Expected ${expectedType}` + receivedType ? `, received ${receivedType}` : '');
  }
}
