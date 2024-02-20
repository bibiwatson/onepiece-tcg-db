const Sequelize = require('sequelize');

require('dotenv').config();

console.log(process.env.db_name);

var sequelize = new Sequelize('database', process.env.DB_USER, process.env.DB_PASS, {
    host: '0.0.0.0',
    dialect: 'sqlite',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: process.env.db_name
});

module.exports = sequelize;