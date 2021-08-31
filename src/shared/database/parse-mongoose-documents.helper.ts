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
import { parseMongooseDocument } from './parse-mongoose-document.helper';
import { MongooseObject } from './mongoose-object.type'
import { ParsedMongooseObject } from './parsed-mongoose-object.type'

export const parseMongooseDocuments = (documents: MongooseObject[]): ParsedMongooseObject[]  => {
  const documentsParsed = documents.map(doc => parseMongooseDocument(doc))
  return documentsParsed
}

