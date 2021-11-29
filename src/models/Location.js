const { DataTypes } = require('sequelize');
const sequelize = require('../instances/mysql');

const Location = sequelize.define('Location',{
    id:{
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    area: {
      type:DataTypes.STRING,
      allowNull: false
    },
    proprietary: {
      type:DataTypes.STRING,
    },
    apartament: {
      type:DataTypes.STRING,
    },
    date: {
      type:DataTypes.STRING
    },
    userId:{
      type:DataTypes.STRING
    }
  },
  {
    tableName: 'location',
    timestamps: false
  }
);

module.exports = Location;