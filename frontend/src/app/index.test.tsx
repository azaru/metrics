import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { store } from './state/store';

import App from './index';

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));
jest.mock('./components/LineChart', () => {
  return () => <div>Mock LineChart</div>;
});
jest.mock('./components/Filters', () => {
  return () => <div>Mock Filters</div>;
});
jest.mock('./components/MetricForm', () => {
  return () => <div>Mock MetricForm</div>;
});

describe('App', () => {
  it('renders the app', () => {

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('app.index.metricsDashboard')).toBeInTheDocument();
  });

});