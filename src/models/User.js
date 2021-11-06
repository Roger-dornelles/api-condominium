const { DataTypes } = require('sequelize');
const sequelize = require('../instances/mysql');

const Propetary = sequelize.define('Propetary',{
    id:{
      primaryKey: true,
      autoIncrement: true,
      type:DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING
    },
    apartament:{
      type:DataTypes.STRING
    },
    contact:{
      type:DataTypes.STRING
    },
    password:{
      type:DataTypes.STRING
    },

  },{
    tableName: 'user',
    timestamps: false
  }
);

module.exports = Propetary;