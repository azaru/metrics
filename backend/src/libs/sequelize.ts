import { Sequelize } from 'sequelize-typescript';

let sequelize: Sequelize;

if(!sequelize){
    sequelize = new Sequelize({
        database: process.env.DB_NAME,
        dialect: 'mysql',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_ENDPOINT,
        port: 3306,
        logging: false,
        dialectOptions: {
            charset: 'utf8',
        },
        dialectModule: require('mysql2'),
    })
    sequelize.sync({force: false})
}

export default sequelize;