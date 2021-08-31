import { AnyKeys } from 'mongoose';
import { Model, FilterQuery, Document } from 'mongoose'
import { parseMongooseDocuments } from './parse-mongoose-documents.helper'
import { parseMongooseDocument } from './parse-mongoose-document.helper'
import { MongooseObject } from './mongoose-object.type'
import { ParsedMongooseObject } from './parsed-mongoose-object.type'

export abstract class EntityRepository<T extends Document, S> {

  constructor(private readonly entityModel: Model<T>) {}

  async exists(query: FilterQuery<T>): Promise<boolean> {
    // facade should "understand" standard id param name
    if(query.id) query._id = query.id

    return await this.entityModel.exists(query)
  }

  async findAll(
    query?: FilterQuery<T>,
    projection?: Record<string, unknown>): Promise<S[]> {

    const documents = await this.entityModel.find(query, { ...projection }).lean({ autopopulate: true })
    const parsedDocuments = parseMongooseDocuments(documents as MongooseObject[])
    return parsedDocuments as ParsedMongooseObject<S>[]
  }

  async create(data: AnyKeys<T>): Promise<S> {
    // facade should "understand" standard id param name
    if(data.id) data._id = data.id

    // add document do db and return it
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
