import React from 'react';
import { render } from '@testing-library/react';
import LineChart from './LineChart';

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div>Mocked ResponsiveLine</div>,
}));

test('renders without crashing', () => {
  const { getByText } = render(
    <LineChart data={[]} />
  );

  // eslint-disable-next-line testing-library/prefer-screen-queries
  expect(getByText(/Mocked ResponsiveLine/i)).toBeInTheDocument();
});