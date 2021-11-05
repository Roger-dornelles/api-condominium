const { DataTypes } = require('sequelize');
const sequelize = require('../instances/mysql')

const Meeting = sequelize.define('Meeting',{
    id:{
      primaryKey: true,
      autoIncrement: true,
      type:DataTypes.INTEGER
    },
    description:{
      type:DataTypes.STRING
    },
    date:{
      type:DataTypes.STRING
    },
    canceled:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  },{
    tableName: 'meetings',
    timestamps:false
  }

);

module.exports = Meeting;