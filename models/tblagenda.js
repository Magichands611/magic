const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const tblclientes = require('./tblclientes')


const tblagenda = db.define('tblagenda', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    procedimento: {
      type: DataTypes.STRING,
    },
    profissional: {
      type: DataTypes.STRING,
    },
    data: {
      type: DataTypes.DATE,
    },
    horario: {
      type: DataTypes.TIME,
    },
  })

  tblagenda.associte = (models) => {
    tblagenda.belongsTo(models.tblclientes, {
      constraint: true,
      foreignKey: 'cpf'
    })
  }
  
  
  module.exports = tblagenda