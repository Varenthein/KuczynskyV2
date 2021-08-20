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
import { MongooseObject } from 'src/database/mongooseObject.interface'
import { ParsedMongooseObject } from 'src/database/parsedMongooseObject.interface'

export const parseMongooseDocuments = (documents: MongooseObject[]): ParsedMongooseObject[]  => {
  const documentsParsed = documents.map(doc => parseMongooseDocument(doc))
  return documentsParsed
}

