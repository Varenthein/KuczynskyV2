import { WrongFileExtensionException } from "../exceptions/file-wrong-extension.exception";

export const imageFileFilter = (_, file, callback) => {
  const allowedFormats = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedFormats.includes(file.mimetype)) {
    return callback(new WrongFileExtensionException(allowedFormats), false);
  }
  callback(null, true);
};
