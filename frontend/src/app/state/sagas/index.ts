import { all } from 'redux-saga/effects';
import metricsSaga from './metrics';

export default function* rootSaga() {
  yield all([metricsSaga()]);
}
