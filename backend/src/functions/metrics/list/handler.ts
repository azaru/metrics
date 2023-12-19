import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import metricService from '@services/metrics';

import schema from './schema';

const list: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { name, from, to } = event.queryStringParameters || {};

  const metrics = await metricService.list(name || undefined, Number(from) || undefined, Number(to) || undefined);
  return formatJSONResponse({
    metrics,
  });
};

export const main = middyfy(list, undefined);
