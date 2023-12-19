import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataPoint, FilterData, MetricsState } from '../../types';
import CONSTANTS from '../../../constants';

const initialState: MetricsState = {
  data: [],
  loading: false,
  error: null,
  filter: CONSTANTS.defaultFilterData,
  master: {
    name: [],
  },

};

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {
    fetchMetricsStart(state, action: PayloadAction<FilterData>) {
      state.loading = true;
      state.filter = action.payload;
    },
    fetchMetricsSuccess(state, action: PayloadAction<DataPoint[]>) { 
      state.data = action.payload;
      state.loading = false;
    },
    fetchMetricsFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addMetricStart(state, action: PayloadAction<DataPoint>) {
      state.loading = true;
    },
    addMetricSuccess(state, action: PayloadAction<DataPoint>) {
     state.loading = false;
     state.data.push(action.payload);
     if(!state.master.name.includes(action.payload.name)){
       state.master.name.push(action.payload.name);
     }
    },
    addMetricFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    initMetrics(state) {
      state.loading = true;
    },
    fetchMasterSuccess(state, action: PayloadAction<{ name: string[] }>) {
      state.master.name = action.payload.name;
    },
    fetchMasterFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
    }
  },
});

export const {
  fetchMetricsStart,
  fetchMetricsSuccess,
  fetchMetricsFailure,
  addMetricStart,
  addMetricSuccess,
  addMetricFailure,
  initMetrics,
  fetchMasterSuccess,
  fetchMasterFailure,
} = metricsSlice.actions;

export default metricsSlice.reducer;
