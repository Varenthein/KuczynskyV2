import { AnyKeys } from 'mongoose';
import { Model, FilterQuery, Document } from 'mongoose'
import { parseMongooseDocuments } from 'src/database/parseMongooseDocuments.helper'
import { parseMongooseDocument } from 'src/database/parseMongooseDocument.helper'
import { MongooseObject } from 'src/database/mongooseObject.type'
import { ParsedMongooseObject } from 'src/database/parsedMongooseObject.type'

export abstract class EntityRepository<T extends Document, S> {

  constructor(private readonly entityModel: Model<T>) {}

  async findAll(
    query?: FilterQuery<T>,
    projection?: Record<string, unknown>): Promise<S[]> {

    const documents = await this.entityModel.find(query, { ...projection }).lean({ autopopulate: true })
    const parsedDocuments = parseMongooseDocuments(documents as MongooseObject[])
    return parsedDocuments as ParsedMongooseObject<S>[]
  }

  async create(data: AnyKeys<T>): Promise<S> {
    const entity = new this.entityModel(data)
    await entity.save()
    const leanObject = entity.toObject() as MongooseObject
    return parseMongooseDocument(leanObject) as ParsedMongooseObject<S>
  }

  async findOneWithHighest(
    paramName,
    query?: FilterQuery<T>,
    projection?: Record<string, unknown>): Promise<S> {

      const entity = await this.entityModel
        .findOne(query, { _id: 0, v: 0, ...projection })
        .sort('-' + paramName)  // give me the max

      const leanObject = entity.toObject() as MongooseObject
      return parseMongooseDocument(leanObject) as ParsedMongooseObject<S>
    }
}
