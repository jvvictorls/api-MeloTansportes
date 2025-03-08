import { DataTypes, QueryInterface, Model } from 'sequelize'
import IRefreshToken from '../../Interfaces/refreshToken/IRefreshToken'

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model<IRefreshToken>>('refresh_token', {
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
        onDelete: 'CASCADE'
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      expiresIn: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('refresh_token')
  }
}