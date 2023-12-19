import React from 'react';
import Filters from './Filters';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import metricsReducer from '../state/features/metricsSlice';


test('renders without crashing', () => {
  const store = configureStore({
    reducer: {
      metrics: metricsReducer,
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <Filters data={[]} />
    </Provider>
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText(/Name/i)).toBeInTheDocument();
});