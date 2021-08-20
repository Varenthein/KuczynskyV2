import { AnyKeys } from 'mongoose';
import { Model, FilterQuery, Document } from 'mongoose'
import { parseMongooseDocuments } from 'src/utils/parseMongooseDocuments.helper'
import { parseMongooseDocument } from 'src/utils/parseMongooseDocument.helper'
import { MongooseObject } from 'src/database/mongooseObject.interface'
import { ParsedMongooseObject } from 'src/database/parsedMongooseObject.interface'

export abstract class EntityRepository<T extends Document, S> {

  constructor(private readonly entityModel: Model<T>) {}

  async findAll(query?: FilterQuery<T>, projection?: Record<string, unknown>): Promise<S[]> {
    const documents = await this.entityModel.find(query, { ...projection }).lean({ autopopulate: true }) as MongooseObject[]

    const parsedDocuments = parseMongooseDocuments(documents)
    return parsedDocuments as (S & ParsedMongooseObject)[]
  }

  async create(data: AnyKeys<T>): Promise<S> {
    const entity = new this.entityModel(data)
    await entity.save()
    const leanObject = entity.toObject() as MongooseObject
    return parseMongooseDocument(leanObject) as (S & ParsedMongooseObject)
  }

  async findOneWithHighest(
    paramName,
    query?: FilterQuery<T>,
    projection?: Record<string, unknown>): Promise<S> {
      const entity = await this.entityModel
        .findOne(query, { _id: 0, v: 0, ...projection })
        .sort('-' + paramName)  // give me the max

      const leanObject = entity.toObject() as MongooseObject
      return parseMongooseDocument(leanObject) as (S & ParsedMongooseObject)
    }
}
