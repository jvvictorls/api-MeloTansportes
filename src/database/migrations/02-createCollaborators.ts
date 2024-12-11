import { QueryInterface, DataTypes, Model } from "sequelize";
import ICollaborators from "../../Interfaces/collaborators/ICollaborators";

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<ICollaborators>>('collaborators', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      boardingTime: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'boarding_time',
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      }
    })
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('collaborators')
  }
}