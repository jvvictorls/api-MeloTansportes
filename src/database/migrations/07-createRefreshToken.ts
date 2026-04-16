import { DataTypes, QueryInterface, Model } from 'sequelize'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model>('refresh_token', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull:false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'user_id',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      expiresIn: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires_in'
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('refresh_token')
  }
}