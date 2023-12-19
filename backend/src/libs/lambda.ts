import middy from "@middy/core"
import middyJsonBodyParser from "@middy/http-json-body-parser"
import validator from "@middy/validator"
import { transpileSchema } from '@middy/validator/transpile'

export const middyfy = (handler, schema: Object | undefined) => {
  let response;
  console.log(schema, handler)
  if (!schema) {
    response = middy(handler).use(middyJsonBodyParser())
  }else{
    response = middy(handler).use(middyJsonBodyParser()).use(validator({ eventSchema: transpileSchema(schema) }))
  }
  return response;
}
