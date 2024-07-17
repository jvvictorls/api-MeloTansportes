import {Model, QueryInterface, DataTypes} from 'sequelize';
import { IRoutes } from '../../Interfaces/Routes/IRoutes';

export default {
  up (queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IRoutes>>('routes', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    driver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    client: {
      type: DataTypes.STRING,
      allowNull: false
    },
    collaborators: {
      type: DataTypes.STRING,
      allowNull: false 
    },
    maxCollaborators: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currentCollaborators: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull:false,
    }
    })
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('routes')
  }
}