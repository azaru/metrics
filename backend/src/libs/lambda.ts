import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import validator from "@middy/validator"
import { transpileSchema } from '@middy/validator/transpile'

export const middyfy = (handler, schema: Object) => {
  return middy(handler).use(middyJsonBodyParser()).use(validator({ eventSchema: transpileSchema(schema) }))
}
