import { QueryInterface, DataTypes } from "sequelize";

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('routes_collaborators', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'route_id',
        references: {
          model: 'routes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      collaborator_Id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'collaborator_id',
        references: {
          model: 'collaborators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    })
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('routes_collaborators')
  }
}
