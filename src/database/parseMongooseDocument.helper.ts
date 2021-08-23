/************************
Mongoose always returns document with _id and __v fields and no id field.
This function aims to convert it to desired format.

{
  _id: ??
  __v: ??
  x: ??
}

->

{
  id: ??
  x: ??
}
************************/
import { MongooseObject } from 'src/database/mongooseObject.type'
import { ParsedMongooseObject } from 'src/database/parsedMongooseObject.type'
import { isMongooseObject } from 'src/utils/isMongooseObject.helper'

export const parseMongooseDocument = (document: MongooseObject): ParsedMongooseObject => {

  // get all params except _id and __v and use it to create new version of doc with id
  const { _id, __v, ...otherProps } = document
  const parsedDocument: ParsedMongooseObject<any> = {...otherProps, id: document._id }

  // if nested param is another Mongoose document (population...), then parse it as well
  for(const key in parsedDocument) {
    if(isMongooseObject(parsedDocument[key])) parsedDocument[key] = parseMongooseDocument(parsedDocument[key])
  }

  return parsedDocument
}

