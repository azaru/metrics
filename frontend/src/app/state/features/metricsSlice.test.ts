import { metricsSlice } from './metricsSlice';
import { DataPoint, FilterData } from '../../types';

describe('metricsSlice', () => {
    it('should handle fetchMetricsStart', () => {
        const filterData: FilterData = {
          name: 'Test',
          from: new Date('2020-01-01T00:00').getTime(),
          to: new Date('2020-12-31T23:59').getTime(),
        };
      
        expect(metricsSlice.reducer(metricsSlice.getInitialState(), {
          type: metricsSlice.actions.fetchMetricsStart.type,
          payload: filterData,
        })).toEqual({
          ...metricsSlice.getInitialState(),
          loading: true,
          filter: filterData,
        });
      });
      
      it('should handle fetchMetricsSuccess', () => {
        const data: DataPoint[] = [{
          name: 'Test',
          value: 10,
          timestamp: new Date('2020-01-01T00:00').getTime(),
        }];
      
        expect(metricsSlice.reducer(metricsSlice.getInitialState(), {
          type: metricsSlice.actions.fetchMetricsSuccess.type,
          payload: data,
        })).toEqual({
          ...metricsSlice.getInitialState(),
          data,
          loading: false,
        });
      });
      
      it('should handle fetchMetricsFailure', () => {
        const error = 'Test error';
      
        expect(metricsSlice.reducer(metricsSlice.getInitialState(), {
          type: metricsSlice.actions.fetchMetricsFailure.type,
          payload: error,
        })).toEqual({
          ...metricsSlice.getInitialState(),
          error,
          loading: false,
        });
      });

      it('should handle initMetrics', () => {
        expect(metricsSlice.reducer(metricsSlice.getInitialState(), {
          type: metricsSlice.actions.initMetrics.type,
        })).toEqual({
          ...metricsSlice.getInitialState(),
          loading: true,
        });
      });
      
      it('should handle fetchMasterSuccess', () => {
        const master = {
          name: ['Test'],
        };
      
        expect(metricsSlice.reducer(metricsSlice.getInitialState(), {
          type: metricsSlice.actions.fetchMasterSuccess.type,
          payload: master,
        })).toEqual({
          ...metricsSlice.getInitialState(),
          master,
          loading: false,
        });
      });
      
      it('should handle fetchMasterFailure', () => {
        const error = 'Test error';
      
        expect(metricsSlice.reducer(metricsSlice.getInitialState(), {
          type: metricsSlice.actions.fetchMasterFailure.type,
          payload: error,
        })).toEqual({
          ...metricsSlice.getInitialState(),
          error,
          loading: false,
        });
      });
});