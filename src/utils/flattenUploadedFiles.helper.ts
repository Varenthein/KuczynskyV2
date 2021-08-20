/************************
@uploadedFiles decorator is designed to handle multiple file fields,
where every field is treated as "multiple". Therefore, even if you have
a form with two SINGLE file fields, you still get an object where every
param is an array and a file itself it the only elem of this array.
e.g. { fieldA: [file], fieldB: [file]}

This function aims to "flatten it", to the format, where every param is
simply a file.

Summary:
{ fieldA: [file], fieldB: [file]} -> { fieldA: file, fieldB: file}
************************/

type FilesInput = {
  [key: string]: Express.Multer.File[]
}

interface FilesOutput {
  [key: string]: Express.Multer.File
}

export const flattenUploadedFiles = (files: FilesInput): FilesOutput => {
  const filesAltered = {}

  for(const [key, value] of Object.entries(files)) {
    filesAltered[key] = value[0]
  }

  return filesAltered
}
