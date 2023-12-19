/* eslint-disable testing-library/prefer-screen-queries */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import MetricForm from './MetricForm';

jest.mock('i18next', () => ({
  t: (key: string) => key,
}));

const mockStore = configureMockStore();

test('renders without crashing', () => {
  const store: any = mockStore({
    metrics: {
      data: [],
    },
  });

  const { getByText } = render(
    <Provider store={store}>
      <MetricForm />
    </Provider>
  );

  expect(getByText("app.components.metricForm.actionSave")).toBeInTheDocument();
});

test('form submission works correctly', () => {
  const store: any = mockStore({
    metrics: {
      data: [],
    },
  });

  const { getByLabelText, getByText } = render(
    <Provider store={store}>
      <MetricForm />
    </Provider>
  );

  fireEvent.change( getByLabelText("app.components.metricForm.metricName"), { target: { value: 'Test' } });
  fireEvent.change( getByLabelText("app.components.metricForm.metricValue"), { target: { value: 10 } });
  fireEvent.change(getByLabelText("app.components.metricForm.metricTimestamp"), { target: { value: '2020-01-01T00:00' } });  fireEvent.click(getByText("app.components.metricForm.actionSave"));

  const actions = store.getActions();
  expect(actions[0].type).toBe('metrics/addMetricStart');
});

test('form validation works correctly', () => {
    const store: any = mockStore({
      metrics: {
        data: [],
      },
    });
  
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <MetricForm />
      </Provider>
    );
  
    fireEvent.change( getByLabelText("app.components.metricForm.metricName"), { target: { value: '' } });
    fireEvent.change( getByLabelText("app.components.metricForm.metricValue"), { target: { value: 10 } });
    fireEvent.change( getByLabelText("app.components.metricForm.metricTimestamp"), { target: { value: '2020-01-01T00:00' } });
    fireEvent.click(getByText("app.components.metricForm.actionSave"));
  
    expect(getByText("app.components.metricForm.error.name")).toBeInTheDocument();
  
    fireEvent.change( getByLabelText("app.components.metricForm.metricName"), { target: { value: 'Test' } });
    fireEvent.change( getByLabelText("app.components.metricForm.metricValue"), { target: { value: 10 } });
    fireEvent.change( getByLabelText("app.components.metricForm.metricTimestamp"), { target: { value: 'invalid date' } });
    fireEvent.click(getByText("app.components.metricForm.actionSave"));
  
    expect(getByText("app.components.metricForm.error.timestamp")).toBeInTheDocument();

    fireEvent.change( getByLabelText("app.components.metricForm.metricName"), { target: { value: 'Test' } });
    fireEvent.change( getByLabelText("app.components.metricForm.metricValue"), { target: { value: 'invalid value' } });
    fireEvent.change( getByLabelText("app.components.metricForm.metricTimestamp"), { target: { value: '2020-01-01T00:00' } });
    fireEvent.click(getByText("app.components.metricForm.actionSave"));

    expect(getByText("app.components.metricForm.error.value")).toBeInTheDocument();
  });