const { DataTypes } = require('sequelize');
const sequelize  = require('../instances/mysql');

const Notices = sequelize.define('Notices', {
    id:{
      primaryKey: true,
      autoIncrement: true,
      type:DataTypes.INTEGER
    },
    title:{
      type:DataTypes.STRING
    },
    description:{
      type:DataTypes.STRING
    }
  },
  {
    tableName:'notices',
    timestamps:false
  }
);

module.exports = Notices;