import { FileFieldsInterceptor } from '@nestjs/platform-express'

export const FileFieldsInterceptorWithLimits = (uploadFields, localOptions) => {
  FileFieldsInterceptor(uploadFields, localOptions)
}
