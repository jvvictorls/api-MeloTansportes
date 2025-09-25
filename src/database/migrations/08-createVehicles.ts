import { QueryInterface, DataTypes, Model } from "sequelize";
import IVehicles from "../../Interfaces/Vehicles/IVehicles";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable<Model<IVehicles>>('vehicles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      plate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fuel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      manufactureYear: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      modelYear: {
        type: DataTypes.INTEGER,
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
      }
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('vehicles', {});
  }

}