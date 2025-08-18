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
      admissionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'admission_date',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
       shift: {
        type: DataTypes.STRING
      },
      phone: {
        type: DataTypes.STRING,
      },
      zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      number: {
        type: DataTypes.STRING,
      },
      company: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      department: {
        type: DataTypes.STRING,
      },
      position: {
        type: DataTypes.STRING,
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