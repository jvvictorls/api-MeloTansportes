import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.createTable('extraRouteCollaborators', {
      extraRouteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'extra_route_id',
        references: {
          model: 'extraRoutes',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      collaboratorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'collaborator_id',
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  async down (queryInterface: QueryInterface) {
    await queryInterface.dropTable('extraRouteCollaborators')
  }
}