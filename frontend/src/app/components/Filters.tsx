import React, { useEffect, useState } from 'react';
import { DataPoint } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetricsStart } from '../state/features/metricsSlice';
import { RootState } from '../state/store';
import { t } from 'i18next';

const Filters: React.FC<{ data: DataPoint[] }> = ({ data }) => {
  const dispatch = useDispatch();
  const defaultFilter = useSelector((state: RootState) => state.metrics.filter)
  const masterData = useSelector((state: RootState) => state.metrics.master);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, serFilterStatus] = useState({
    name: defaultFilter.name,
    from: new Date(defaultFilter.from),
    to: new Date(defaultFilter.to)
  });

  useEffect(() => {
    if(!filterStatus.name){
      serFilterStatus({
        ...filterStatus,
        name: defaultFilter.name
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultFilter]);

  const onChange = (event: any) => {

    const name = event.target.name;
    let value = event.target.value;

    if (name === 'from' || name === 'to') {
      value = new Date(value);

      if (name === 'from' && value > filterStatus.to) {
        setErrorMessage(t("app.components.filters.error.from"));
        return;
      }

      if (name === 'to' && value < filterStatus.from) {
        setErrorMessage(t("app.components.filters.error.to"));
        return;
      }
      
    }

    setErrorMessage('');
    serFilterStatus({
      ...filterStatus,
      [event.target.name]: value
    });
  };

  const handleFilter = (event: any) => {
    dispatch(fetchMetricsStart({
      name: filterStatus.name,
      from: filterStatus.from.getTime(),
      to: filterStatus.to.getTime()
    }));
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-base font-bold mb-4 text-center">{t("app.components.filters.filterMetrics")}</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <select name="name" onChange={onChange} value={filterStatus.name} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          {masterData.name.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t("app.components.filters.fromDate")}</label>
        <input name="from" onChange={onChange}  type="datetime-local" value={filterStatus.from?.toISOString().slice(0, -1)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">{t("app.components.filters.toDate")}</label>
        <input name="to" onChange={onChange}  type="datetime-local" value={filterStatus.to?.toISOString().slice(0, -1)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        <button onClick={handleFilter} className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        {t("app.components.filters.actionFilter")}
        </button>
      </div>
    </div>
  );
};

export default Filters;