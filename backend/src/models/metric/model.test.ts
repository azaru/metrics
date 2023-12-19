import Metric from './model';
import MetricRepository from './index';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

jest.mock('./model');

describe('find', () => {
  beforeEach(() => {
    (Metric.findAll as jest.Mock).mockClear();
  });

  it('should call Metric.findAll with correct parameter', async () => {
    const name = 'metricName';
    const from = new Date();
    const to = new Date();
  
    await MetricRepository.find(name, from.getTime(), to.getTime());
  
    expect(Metric.findAll).toHaveBeenCalledWith({
      where: {
        name: name,
        timestamp: {
          [Op.gte]: from.getTime(),
          [Op.lte]: to.getTime(),
        },
      },
    });
  });

  it('should call Metric.findAll with correct parameters', async () => {
    const from = new Date();
    const to = new Date();

    await MetricRepository.find(undefined, from.getTime(), to.getTime());

    expect(Metric.findAll).toHaveBeenCalledWith({
      where: {
        timestamp: {
          [Op.gte]: from.getTime(),
          [Op.lte]: to.getTime(),
        },
      },
    });
  });

  it('should call Metric.findAll with no parameters', async () => {
    await MetricRepository.find(undefined, undefined, undefined);

    expect(Metric.findAll).toHaveBeenCalledWith({where: {}});
  });

  it('should call Metric.findAll with only from parameter', async () => {
    const from = new Date();

    await MetricRepository.find(undefined, from.getTime(), undefined);

    expect(Metric.findAll).toHaveBeenCalledWith({
      where: {
        timestamp: {
          [Op.gte]: from.getTime(),
        },
      },
    });
  });

  it('should call Metric.findAll with only to parameter', async () => {
    const to = new Date();

    await MetricRepository.find(undefined, undefined, to.getTime());

    expect(Metric.findAll).toHaveBeenCalledWith({
      where: {
        timestamp: {
          [Op.lte]: to.getTime(),
        },
      },
    });
  });

  it('should throw an error if Metric.findAll throws an error', async () => {
    const name = 'name';
    const from = 1234567890;
    const to = 1234567891;

    const findAllSpy = jest.spyOn(Metric, 'findAll');
    findAllSpy.mockRejectedValue(new Error('Test error'));

    await expect(MetricRepository.find(name, from, to)).rejects.toThrow('Test error');
  });
});

describe('create', () => {

  it('should call Metric.create with correct parameters', async () => {
    const metric = { name: 'metricName', timestamp: new Date().getTime(), value: 42 };
  
    await MetricRepository.create(metric.name, metric.timestamp, metric.value);
  
    expect(Metric.create).toHaveBeenCalledWith({
      name: metric.name,
      timestamp: metric.timestamp,
      value: metric.value
    });
  });

  it('should throw an error if Metric.create throws an error', async () => {
    const name = 'name';
    const timestamp = 1234567890;
    const value = 5;

    const createSpy = jest.spyOn(Metric, 'create');
    createSpy.mockRejectedValue(new Error('Test error'));

    await expect(MetricRepository.create(name, timestamp, value)).rejects.toThrow('Test error');
  });

});

describe('getMaster', () => {
  it('should call Metric.findAll with correct parameters and return an array of distinct names', async () => {
    const mockMetrics = [
      { name: 'name1' },
      { name: 'name2' },
    ] as Metric[];

    const findAllSpy = jest.spyOn(Metric, 'findAll');
    findAllSpy.mockResolvedValue(mockMetrics);

    const result = await MetricRepository.getMaster();

    expect(findAllSpy).toHaveBeenCalledWith({
      attributes: [
        [Sequelize.fn('DISTINCT', Sequelize.col('name')), 'name'],
      ],
    });
    expect(result).toEqual({ name: ['name1', 'name2'] });
  });

  it('should throw an error if Metric.findAll throws an error', async () => {
    const findAllSpy = jest.spyOn(Metric, 'findAll');
    findAllSpy.mockRejectedValue(new Error('Test error'));

    await expect(MetricRepository.getMaster()).rejects.toThrow('Test error');
  });


});