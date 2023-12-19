import { call } from 'redux-saga/effects';
import { fetchMetrics, addMetric } from './metrics';
import { fetchMetricsSuccess, fetchMetricsFailure, addMetricSuccess, addMetricFailure } from '../features/metricsSlice';
import { List, Create } from '../../api/metrics';
import { expectSaga } from 'redux-saga-test-plan';
import { PayloadAction } from '@reduxjs/toolkit';
import { DataPoint, FilterData } from '../../types';

describe('metrics sagas', () => {
  it('should handle fetchMetrics', () => {
    const action = {
      payload: {
        name: 'Test',
        from: new Date('2020-01-01T00:00').getTime(),
        to: new Date('2020-12-31T23:59').getTime(),
      },
    } as PayloadAction<FilterData>;

    const response = {
      json: () => ({
        metrics: [{
          name: 'Test',
          value: 10,
          timestamp: new Date('2020-01-01T00:00').getTime(),
        }],
      }),
    };

    return expectSaga(fetchMetrics, action)
      .provide([
        [call(List, action.payload), response],
      ])
      .put(fetchMetricsSuccess(response.json().metrics))
      .run();
  });

  it('should handle fetchMetrics failure', () => {
    const action = {
      payload: {
        name: 'Test',
        from: new Date('2020-01-01T00:00').getTime(),
        to: new Date('2020-12-31T23:59').getTime(),
      },
    } as PayloadAction<FilterData>;

    const error = new Error('Test error');

    return expectSaga(fetchMetrics, action)
      .provide([
        [call(List, action.payload), Promise.reject(error)],
      ])
      .put(fetchMetricsFailure(error.message))
      .run();
  });

  it('should handle addMetric', () => {
    const action = {
      payload: {
        name: 'Test',
        value: 10,
        timestamp: new Date('2020-01-01T00:00').getTime(),
      },
    } as PayloadAction<DataPoint>;

    const response = {
      json: () => ({
        metric: action.payload,
      }),
    };

    return expectSaga(addMetric, action)
      .provide([
        [call(Create, action.payload), response],
      ])
      .put(addMetricSuccess(response.json().metric))
      .run();
  });

  it('should handle addMetric failure', () => {
    const action = {
      payload: {
        name: 'Test',
        value: 10,
        timestamp: new Date('2020-01-01T00:00').getTime(),
      },
    } as PayloadAction<DataPoint>;

    const error = new Error('Test error');

    return expectSaga(addMetric, action)
      .provide([
        [call(Create, action.payload), Promise.reject(error)],
      ])
      .put(addMetricFailure(error.message))
      .run();
  });
});