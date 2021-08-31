import { BadRequestException } from '@nestjs/common';

export class ImageWrongAmountException extends BadRequestException {
  constructor(expectedAmount: number, receivedAmount: number) {
    super(`Image amount is invalid. Expected ${expectedAmount}, received ${receivedAmount}`);
  }
}
