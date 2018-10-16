/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Sequelize, { Op } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
    config.databaseUrl, 
    config.username, 
    config.password, 
    {
        operatorsAliases: Op,
        define: {
            freezeTableName: true,
        },
    }
);

// your config file will be in your directory
const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, {
        host: config.host,
        port: 3306,
        logging: console.log,
        maxConcurrentQueries: 100,
        dialect: 'postgres',
        dialectOptions: {
            ssl:'Amazon RDS'
        },
        pool: { maxConnections: 5, maxIdleTime: 30},
    }
)


export default sequelize;