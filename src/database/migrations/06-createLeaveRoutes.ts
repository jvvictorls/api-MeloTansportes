import { QueryInterface, DataTypes, Model } from "sequelize";
import ILeaveRoutes from "../../Interfaces/leaveRoutes/ILeaveRoutes";

export default {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable<Model<ILeaveRoutes>>('leave_routes', {
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
      maxCollaborators: { 
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'max_collaborators'
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
      },

    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('leave_routes');
  }
}
    