const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('sessions', {
      sid: {
        type: DataTypes.TEXT,
        primaryKey: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    }, {
      timestamps: true,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('sessions')
  },
}
