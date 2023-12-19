import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './state/store';
import { initMetrics } from './state/features/metricsSlice';
import LineChart from './components/LineChart';
import Filters from './components/Filters';
import { DataPoint } from './types';
import MetricForm from './components/MetricForm';
import { t } from 'i18next';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const metrics = useSelector((state: RootState) => state.metrics.data);
  const filters = useSelector((state: RootState) => state.metrics.filter);

  useEffect(() => {
    dispatch(initMetrics());
  }, []);

  const filteredData = metrics.filter((item: DataPoint) => {
    const { name, from, to } = filters;
    const date = new Date(item.timestamp);
    return item.name === name && date >= new Date(from) && date <= new Date(to);
  });

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="p-4 bg-blue-500 text-white w-full">
        <h1 className="text-2xl">{t('app.index.metricsDashboard')}</h1>
      </header>
      <main className="flex flex-col lg:flex-row flex-grow overflow-auto">
        <section className="flex flex-col p-4 w-full lg:w-64 border-r border-gray-200">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">{t('app.index.controls')}</h2>
          <div className="mb-4">
            <Filters data={filteredData} />
          </div>
          <div>
            <MetricForm />
          </div>
        </section>
        <section className="flex-grow p-4">
          <h2 className="mb-4 text-lg font-semibold text-gray-700">{t('app.index.chart')}</h2>
          <div className="bg-white rounded shadow p-4">
            <LineChart data={filteredData} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
