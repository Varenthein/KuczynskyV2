import { Injectable } from '@nestjs/common'
import { ImageRequiredNotExistException } from 'src/shared/exceptions/image-required-not-exist.exception';
import { ImageWrongAmountException } from 'src/shared/exceptions/image-wrong-amount.exception';

interface FileValidatorOptions {
  amount?: number
}

@Injectable()
export class FileValidatorService {
  isFilesArray(files: Express.Multer.File[] | null | undefined, options?: FileValidatorOptions): void {

    // check if it's really an array
    if(!Array.isArray(files)) throw new ImageRequiredNotExistException()

    // check options
    if(options.amount && files.length !== options.amount) throw new ImageWrongAmountException(options.amount, files.length)
  }
}
