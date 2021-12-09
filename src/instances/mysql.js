const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  //process.env.MYSQL_URI,
  {
    dialect:'postgres',
    port:process.env.MYSQL_PORT
  }
);

module.exports = sequelize;