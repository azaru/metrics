import GetMaster from './GetMaster';
import CONSTANTS from '../../../constants';

// Mock the fetch function
global.fetch = require('jest-fetch-mock');

describe('GetMaster function', () => {
  it('should make a GET request to the correct URL', async () => {
    const url = new URL(CONSTANTS.endpoints.metrics.master.path, CONSTANTS.host || window.location.origin);

    // Call the GetMaster function
    await GetMaster();

    // Check if fetch was called with the correct arguments
    expect(fetch).toHaveBeenCalledWith(url.toString(), {
      method: CONSTANTS.endpoints.metrics.master.method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
});