import Create from './Create';
import CONSTANTS from '../../../constants';
import { DataPoint } from '../../types';

global.fetch = require('jest-fetch-mock');

describe('Create function', () => {
  it('should make a POST request to the correct URL with the correct body', async () => {
    const data: DataPoint = {
      name: 'Test',
      value: 10,
      timestamp: new Date('2021-01-01T00:00:00.000Z').getTime(),
    };

    const url = new URL(CONSTANTS.host + CONSTANTS.endpoints.metrics.create.path);
    await Create(data);

    expect(fetch).toHaveBeenCalledWith(url.toString(), {
      method: CONSTANTS.endpoints.metrics.create.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });
});