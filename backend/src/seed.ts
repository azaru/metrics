require('dotenv').config();
import sequelize from './libs/sequelize';

import Metric from './models/metric/model';

(async () => {
    await sequelize.sync({ force: true });

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max-min+1))+min;
      }
    const time = 2 * 24 * 60 * 60 * 1000;
    const from = Date.now() - time;
    const to = Date.now() + time;
    
    const promises = [];

    for(let i = 0; i < 100000; i++){
        promises.push(Metric.create({ name: 'metric'+getRandomInt(1,2), timestamp: getRandomInt(from, to), value: getRandomInt(1,100) }));    
    }
    await Promise.all(promises);
    
})();
