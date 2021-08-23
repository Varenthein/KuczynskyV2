type acceptedParamValue =
  | string
  | number
  | boolean
  | null
  | acceptedParamValue[]
  | {
    [k: string]: acceptedParamValue
  }

export type MongooseObject<S = any> = {
  _id: string,
  __v: number,
  [k: string]: acceptedParamValue
} & S
