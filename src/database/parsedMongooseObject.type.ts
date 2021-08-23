type acceptedParamValue =
  | string
  | number
  | boolean
  | null
  | acceptedParamValue[]
  | {
    [k: string]: acceptedParamValue
  }

export type ParsedMongooseObject<S = any> = {
  id: string,
  [k: string]: acceptedParamValue
} & S
