export const isMongooseObject = (obj: any): boolean => typeof(obj) === "object" && obj.hasOwnProperty('_id') && obj.hasOwnProperty('__v')
