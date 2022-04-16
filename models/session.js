const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class Session extends Model {}

Session.init({
  sid: {
    type: DataTypes.TEXT,
    primaryKey: true,
  },
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'session'
})

module.exports = Session
