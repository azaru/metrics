import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import metricService from '@services/metrics';

import schema from './schema';

const create: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const response = await metricService.create(event.body.name, event.body.timestamp, event.body.value);
  return formatJSONResponse({
    metric: response
  });
};

export const main = middyfy(create, schema);
