import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchMasterFailure, fetchMasterSuccess, fetchMetricsStart, fetchMetricsSuccess, fetchMetricsFailure, addMetricStart, addMetricSuccess, addMetricFailure, initMetrics } from '../features/metricsSlice';
import { DataPoint, FilterData } from '../../types';
import { PayloadAction } from '@reduxjs/toolkit';
import { List, Create, GetMaster } from '../../api/metrics';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import CONSTANTS from '../../../constants';

export function* fetchMetrics(action: PayloadAction<FilterData | undefined>): Generator<any, any, any> {
    try {
        const response = yield call(List, action.payload);
        const data = yield response.json();
        yield put(fetchMetricsSuccess(data.metrics));
    } catch (error: any) {
        toast.error(error.message);
        yield put(fetchMetricsFailure(error.message));
    }
}

export function* addMetric(action: PayloadAction<DataPoint>): Generator<any, any, any> {
    try {
        const metricData = action.payload;
        const response = yield call(Create, metricData);
        const data = yield response.json();
        yield put(addMetricSuccess(data.metric));
        toast.success(t("app.toast.metric.created"));
    } catch (error: any) {
        toast.error(error.message);
        yield put(addMetricFailure(error.message));
    }
}


export function* initMetricsStart(): Generator<any, any, any> {
    try {
        const masterResponse = yield call(GetMaster);
        const masterData = yield masterResponse.json();
        
        const fetchMetricsParams: FilterData = {
            ...CONSTANTS.defaultFilterData,
            name: masterData.master.name[0],
        };

        yield put(fetchMasterSuccess(masterData.master));
        yield put(fetchMetricsStart(fetchMetricsParams));
    } catch (error: any) {
        toast.error(error.message);
        yield put(fetchMasterFailure(error.message));
    }
}

function* metricsSaga() {
  yield takeLatest(fetchMetricsStart.type, fetchMetrics);
  yield takeLatest(addMetricStart.type, addMetric);
  yield takeLatest(initMetrics.type, initMetricsStart)
}

export default metricsSaga;
