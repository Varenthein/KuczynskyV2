import { randomString } from './random-string.util';

export const prepareSafeFilename = (originalName: string) => {
  const fullNameArray = originalName.split('.')
  const name = fullNameArray[0]
  const ext = fullNameArray[fullNameArray.length - 1]

  return `${name}-${randomString()}.${ext}`
}
