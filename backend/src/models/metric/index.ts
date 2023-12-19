import Metric from './model';
import { Op, Sequelize } from 'sequelize';

class MetricRepository {
  static async find(name: string | undefined, from: number | undefined, to: number | undefined) : Promise<Metric[]> {
    const whereClause: any = {};

    if (name !== undefined) {
      whereClause.name = name;
    }

    if (from !== undefined) {
      whereClause.timestamp = { ...whereClause.timestamp, [Op.gte]: from };
    }

    if (to !== undefined) {
      whereClause.timestamp = { ...whereClause.timestamp, [Op.lte]: to };
    }

    try{
      return await Metric.findAll({ where: whereClause });
    }catch(error){
      throw new Error(error);
    }
  }

  static async create(name: string, timestamp: number, value: number) : Promise<Metric> {
    try{
      return await Metric.create({ name, timestamp, value });
    }catch(error){
      throw new Error(error);
    }
  }

  static async getMaster(): Promise<{ name: string[] }> {
    try{
      const allNames = await Metric.findAll({
          attributes: [
              [Sequelize.fn('DISTINCT', Sequelize.col('name')) ,'name'],
          ]
      });
        return {name: allNames.map((metric) => metric.name)};
    }catch(error){
        throw new Error(error);
    }
  }
}

export default MetricRepository;