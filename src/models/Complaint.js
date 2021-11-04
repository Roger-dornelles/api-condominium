const { DataTypes } = require('sequelize');
const sequelize = require('../instances/mysql');

const Complaint = sequelize.define('Complaint',{
  id:{
    primaryKey:true,
    autoIncrement:true,
    type: DataTypes.INTEGER
  },
  userId:{
    type:DataTypes.STRING
  },
  description:{
    type:DataTypes.STRING
  },
  date_conclusion:{
    type:DataTypes.STRING
  },
  date_inicial:{
    type:DataTypes.STRING
  },
  conclusion:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
  },
  image:{
    type:DataTypes.STRING
  }
  },{
    tableName: 'complaints',
    timestamps: false
  }
);

module.exports = Complaint;