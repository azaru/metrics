import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMetricStart } from '../state/features/metricsSlice';
import { DataPoint } from '../types';
import { t } from 'i18next';

const MetricForm: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<DataPoint>({ name: '', value: 0, timestamp: 0 });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage(t('app.components.metricForm.error.name'));
      return;
    }

    const timestamp = new Date(formData.timestamp).getTime();
    if (isNaN(timestamp) || timestamp <= 0) {
      setErrorMessage(t('app.components.metricForm.error.timestamp'));
      return;
    }

    if (isNaN(formData.value) || formData.value <= 0) {
      setErrorMessage(t('app.components.metricForm.error.value'));
      return;
    }

    setErrorMessage(null);
    dispatch(addMetricStart({
      name: formData.name,
      value: Number(formData.value),
      timestamp: new Date(formData.timestamp).getTime()
    }));
    setFormData({ name: '', value: 0, timestamp: 0 }); 
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-bold mb-4 text-center">{t("app.components.metricForm.newMetricPoint")}</h2>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          {t("app.components.metricForm.metricName")}
        </label>
        <input
          id="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t("app.components.metricForm.metricName")}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
          {t("app.components.metricForm.metricValue")}
        </label>
        <input
          id="value"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          name="value"
          value={formData.value}
          onChange={handleChange}
          placeholder={t("app.components.metricForm.metricValue")}
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="timestamp">
          {t("app.components.metricForm.metricTimestamp")}
        </label>
        <input
          id="timestamp"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="datetime-local"
          name="timestamp"
          value={formData.timestamp}
          onChange={handleChange}
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <button type="submit" className="py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
        {t("app.components.metricForm.actionSave")}
      </button>
    </form>
  );
};

export default MetricForm;
