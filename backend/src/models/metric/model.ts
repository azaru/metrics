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
// sequelize.sync({ force: false }).then(() => console.log('Metrics table created')).catch((err) => console.log(err));

export default Metric;