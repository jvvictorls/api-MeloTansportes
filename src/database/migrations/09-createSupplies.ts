import {QueryInterface, DataTypes, Model} from "sequelize";
import ISupplies from "../../Interfaces/Supplies/ISupplies";
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model<ISupplies>>('supplies', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'vehicle_id',
        references: { 
          model: 'vehicles',
          key: 'id' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      unity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unity_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      fiscal_note: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at'
      },
  },
)},

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('supplies', {});
  } 
}