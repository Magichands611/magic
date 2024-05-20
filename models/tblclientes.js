const { DataTypes } = require('sequelize')
const db = require('../db/conn')
const tblreservas = require('./tblagenda')

const tblclientes = db.define('tblclientes', {
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING,
  },
  idade: {
    type: DataTypes.STRING,
  },
  contato: {
    type: DataTypes.STRING,
  },
  end: {
    type: DataTypes.STRING,
  },
  bairro: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
  },
  queixa: {
    type: DataTypes.STRING,
  },
  trombose: {
    type: DataTypes.STRING,
  },
  hipotenso: {
    type: DataTypes.STRING,
  },
  hipertenso: {
    type: DataTypes.STRING,
  },
  tontura: {
    type: DataTypes.STRING,
  },
  diabetico: {
    type: DataTypes.STRING,
  },
  alimentou: {
    type: DataTypes.STRING,
  },
  atividade: {
    type: DataTypes.STRING,
  },
  fumante: {
    type: DataTypes.STRING,
  },
  ciclo: {
    type: DataTypes.STRING,
  },
  osteoporose: {
    type: DataTypes.STRING,
  },
  infeccao: {
    type: DataTypes.STRING,
  },
  marcapasso: {
    type: DataTypes.STRING,
  },
  alergia: {
    type: DataTypes.STRING,
  },
  protese: {
    type: DataTypes.STRING,
  },
  lesoes: {
    type: DataTypes.STRING,
  },
  botox: {
    type: DataTypes.STRING,
  },
  cirurgia: {
    type: DataTypes.STRING,
  },
  epiletico: {
    type: DataTypes.STRING,
  },
  historico: {
    type: DataTypes.STRING,
  },
  endocrino: {
    type: DataTypes.STRING,
  },
  respiratorio: {
    type: DataTypes.STRING,
  },
  varizes: {
    type: DataTypes.STRING,
  },
  cardiopatia: {
    type: DataTypes.STRING,
  },
  refluxo: {
    type: DataTypes.STRING,
  },
  constipacao: {
    type: DataTypes.STRING,
  },
  gastrite: {
    type: DataTypes.STRING,
  },
  urinario: {
    type: DataTypes.STRING,
  },
  muscular: {
    type: DataTypes.STRING,
  },
  pergunta: {
    type: DataTypes.STRING,
  },
})
module.exports = tblclientes