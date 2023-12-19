import metricService from './index';
import Metric from '@models/metric';

jest.mock('@models/metric');

describe('metricService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {

    it('should call Metric.find with no parameters', async () => {
      await metricService.list(undefined, undefined, undefined);

      expect(Metric.find).toHaveBeenCalledWith(undefined, undefined, undefined);
    });

    it('should call Metric.find with correct parameters', async () => {
        const name = 'metricName';
        const from = new Date().getTime();
        const to = new Date().getTime();
      
        await metricService.list(name, from, to);
      
        expect(Metric.find).toHaveBeenCalledWith(name, from, to);
      });
  });

  describe('create', () => {
    it('should call Metric.create with correct parameters and return the created metric', async () => {
      const name = 'name';
      const timestamp = 1234567890;
      const value = 5;

      const metricCreateSpy = jest.spyOn(Metric, 'create');
      await metricService.create(name, timestamp, value);
  
      expect(metricCreateSpy).toHaveBeenCalledWith(name, timestamp, value);
    });
  });

  describe('master', () => {
    it('should return an object with a name property that is an array of strings', async () => {
      const mockNames = ['name1', 'name2'];
      const getMasterSpy = jest.spyOn(Metric, 'getMaster');
      getMasterSpy.mockResolvedValue({ name: mockNames });

      const result = await metricService.master();

      expect(getMasterSpy).toHaveBeenCalled();
      expect(result).toEqual({ name: mockNames });
    });
  });
  
});