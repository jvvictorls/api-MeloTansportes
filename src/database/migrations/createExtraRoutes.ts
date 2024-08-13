import {
  Model,
  DataTypes,
  QueryInterface
} from 'sequelize'
import IExtraRoute from '../../Interfaces/Routes/IExtraRoute'

export default {
  async up (queryInterface: QueryInterface) {
    return await queryInterface.createTable<Model<IExtraRoute>>('extra_routes', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      costCenter: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'cost_center'
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
      }
    })
  },

  async down (queryInterface: QueryInterface) {
    return await queryInterface.dropTable('extra_routes')
  }
}