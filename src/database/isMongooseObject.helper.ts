export const isMongooseObject = (obj: any): boolean => obj.hasOwnProperty('_id') && obj.hasOwnProperty('__v')
