import { mongo } from 'mongoose'

export const prepareDatabaseId = () => new mongo.ObjectId()
