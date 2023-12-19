import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import metricService from '@services/metrics';

import schema from './schema';

const master: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async () => {
  const master = await metricService.master();
  return formatJSONResponse({
    master,
  });
};

export const main = middyfy(master, undefined);
