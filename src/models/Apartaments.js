const { DataTypes } = require('sequelize');
const sequelize = require('../instances/mysql');

const Apartaments = sequelize.define('Apartaments',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type:DataTypes.INTEGER
  },
  apartament:{
    type:DataTypes.STRING
  },
  proprietary:{
    type:DataTypes.STRING
  },
  contact:{
    type:DataTypes.STRING
  }
},{
  tableName: 'apartaments',
  timestamps: false
});

module.exports = Apartaments;