import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import rootSaga from '../sagas';
import metricsReducer from '../features/metricsSlice';

const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    metrics: metricsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware as any),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
