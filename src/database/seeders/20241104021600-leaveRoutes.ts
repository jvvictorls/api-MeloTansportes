import { QueryInterface, DataTypes,  } from "sequelize";

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('leave_routes', [
      {
        name: 'Rota 1',
        driver: 'Eldir Júnior',
        client: 'Eurochem',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rota 2',
        driver: 'Alex Gomes',
        client: 'Eurochem',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date()                
      },
      {
        name: 'Rota 3',
        driver: 'Felipe Silva',
        client: 'Eurochem',
        max_collaborators: 15,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('leaveRoutes', {});
  }
}