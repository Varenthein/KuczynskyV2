/************************
Mongoose always returns documents with _id and __v fields and no id field.
This function aims to convert it to desired format.

[{
  _id: ??
  __v: ??
  x: ??
}, ...]

->

[{
  id: ??
  x: ??
}, ...]
************************/
import { parseMongooseDocument } from './parseMongooseDocument.helper';
import { MongooseObject } from './mongooseObject.type'
import { ParsedMongooseObject } from './parsedMongooseObject.type'

export const parseMongooseDocuments = (documents: MongooseObject[]): ParsedMongooseObject[]  => {
  const documentsParsed = documents.map(doc => parseMongooseDocument(doc))
  return documentsParsed
}

