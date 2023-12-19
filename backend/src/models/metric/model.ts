import { Table, Column, Model, DataType, Index, AllowNull } from 'sequelize-typescript';
import sequelize from '@libs/sequelize';

@Table({ modelName: 'Metrics', timestamps: false })
class Metric extends Model {
  @Index({ unique: false })
  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;
  
  @AllowNull(false)
  @Column(DataType.BIGINT)
  timestamp: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  value: number;
}

sequelize.addModels([Metric]);

export default Metric;