import { QueryInterface } from "sequelize";
export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('routes', [
      {
        name: 'Rota 1',
        driver: 'Motorista 1',
        client: 'Cliente 1',
        max_collaborators: 2,
        current_collaborators: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rota 2',
        driver: 'Motorista',
        client: 'Cliente 2',
        max_collaborators: 2,
        current_collaborators: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Rota 3',
        driver: 'Motorista',
        client: 'Cliente 3',
        max_collaborators: 2,
        current_collaborators: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('routes', {});
  }
}