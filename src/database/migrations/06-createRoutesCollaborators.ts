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
      routeId: {
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
      collaboratorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'collaborator_id',
        references: {
          model: 'collaborators',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      boardingTime: {
        type: DataTypes.TIME,
        allowNull: true,
        field: 'boarding_time',
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'updated_at',
      },
    })
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('routes_collaborators')
  }
}
